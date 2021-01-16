package main

import (
	"fmt"
	"net"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/gocolly/colly"
)

func main() {
	fmt.Println("*** START WEBSCRAPER ***")

	scrape() // run this using a CRON job
}

// scrape this article
/* !!! STEPS !!!

- scrap all tables in article
- take data from tables and use DROPBASE to import the database
- connect to DROPBASE's REST api using the token
-

*/
var article = "https://www.canada.ca/en/public-health/services/diseases/2019-novel-coronavirus-infection/prevention-risks/covid-19-vaccine-treatment/vaccine-rollout.html"

type distributedTotal struct {
	location string
	pfizer   int
	moderna  int
	total    int
}

func scrape() {
	fmt.Printf("\n\nScraping `%s`\n", article)

	c := colly.NewCollector() // colly.Debugger(&debug.LogDebugger{})
	addHandlers(c)

	c.OnHTML("table#t1", func(e *colly.HTMLElement) {
		cap := e.DOM.ContentsFiltered("caption").Contents().Text()
		fmt.Printf("Caption: %s\n", strings.Trim(cap, " \n"))
		// fmt.Println(e.ChildAttr("caption", ""))
		e.ForEach("tbody tr", func(i int, e *colly.HTMLElement) {
			// fmt.Println(i)
			if i <= 13 {
				var data distributedTotal
				e.ForEach("tr td", func(j int, ee *colly.HTMLElement) {
					// fmt.Println(j)
					text := ee.DOM.Contents().Text()
					if j == 0 {
						data.location = text
						// fmt.Println(text)
					} else {
						cont, _ := strconv.Atoi(strings.Trim(text, " ,"))
						// fmt.Println(cont)
						if j == 1 {
							data.pfizer = cont
							// fmt.Println(cont)
						} else if j == 2 {
							data.moderna = cont
							// fmt.Println(cont)
						}
					}
					fmt.Println(data)
				})
			}
		})
	})

	c.Visit(article)
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
