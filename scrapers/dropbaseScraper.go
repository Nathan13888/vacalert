package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net"
	"net/http"
	"os"
	"regexp"
	"strconv"
	"strings"
	"time"

	"github.com/gocolly/colly"
)

func main() {
	fmt.Println("*** START WEBSCRAPER ***")

	scrape() // run this using a CRON job
}

/* !!! PROCEDURE !!!

- scrap all tables in article for vaccine data
- import data into dropbase
- feed data through Dropbase's pipeline and process it
- get processed data from pipeline from postgREST
- cache data into a distributed database like Cockroach

*/
var article = "https://www.canada.ca/en/public-health/services/diseases/2019-novel-coronavirus-infection/prevention-risks/covid-19-vaccine-treatment/vaccine-rollout.html"

type distributedTotal struct {
	Location string `json:"location"`
	Pfizer   int    `json:"pfizer"`
	Moderna  int    `json:"moderna"`
	Total    int    `json:"total"`
}

func scrape() {
	fmt.Printf("\n\nScraping `%s`\n", article)

	c := colly.NewCollector() // colly.Debugger(&debug.LogDebugger{})
	addHandlers(c)

	c.OnHTML("table#t1", func(e *colly.HTMLElement) {
		cap := e.DOM.ContentsFiltered("caption").Contents().Text()
		fmt.Printf("Caption: %s\n", strings.Trim(cap, " \n"))
		// fmt.Println(e.ChildAttr("caption", ""))

		totals := []distributedTotal{}

		e.ForEach("tbody tr", func(i int, e *colly.HTMLElement) {
			if i <= 13 {
				data := distributedTotal{}
				e.ForEach("tr td", func(j int, ee *colly.HTMLElement) {
					text := ee.DOM.Contents().Text()
					if j == 0 {
						if strings.Contains(text, "Canada") {
							text = "Canada"
						}

						// remove all duplicate spaces
						reg := regexp.MustCompile(`\s+`)
						text := reg.ReplaceAllString(text, " ")

						data.Location = text
					} else {
						cont, err := strconv.Atoi(
							strings.Trim(strings.ReplaceAll(text, ",", ""), " "))
						if err != nil {
							panic(err)
						}
						if j == 1 {
							data.Pfizer = cont
						} else if j == 2 {
							data.Moderna = cont
						} else if j == 3 {
							data.Total = cont
						}
					}
				})
				// fmt.Println(data)
				// json, _ := json.Marshal(data)
				// fmt.Println(string(json))
				totals = append(totals, data)
			}
		})

		fmt.Println(totals)

		json, err := json.Marshal(totals)

		if err != nil {
			panic(err)
		}

		fmt.Println(string(json))
		jsonToFile("out.json", string(json))
	})

	c.Visit(article)
}

func jsonToFile(name string, json string) {
	file, err := os.Create(name)
	if err != nil {
		// return err
	}
	defer file.Close()

	_, err = io.WriteString(file, json)
	if err != nil {
		// return err
	}
}

func addHandlers(c *colly.Collector) {
	// transport settings
	c.WithTransport(&http.Transport{
		Proxy: http.ProxyFromEnvironment,
		DialContext: (&net.Dialer{
			Timeout:   30 * time.Second,
			KeepAlive: 30 * time.Second,
			DualStack: true,
		}).DialContext,
		MaxIdleConns:          100,
		IdleConnTimeout:       90 * time.Second,
		TLSHandshakeTimeout:   10 * time.Second,
		ExpectContinueTimeout: 1 * time.Second,
	})
	// Set error handler
	c.OnError(func(r *colly.Response, err error) {
		fmt.Println("Request URL: ", r.Request.URL, "failed with response:", r, "\nError:", err)
	})

	c.OnRequest(func(r *colly.Request) {
		fmt.Printf("Visiting: %s\n\n", r.URL.String())
	})
}
