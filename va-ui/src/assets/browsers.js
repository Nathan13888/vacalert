var browsers = /((CPU[ +]OS|iPhone[ +]OS|CPU[ +]iPhone|CPU IPhone OS)[ +]+(12[_\.]2|12[_\.]([3-9]|\d{2,})|12[_\.]4|12[_\.]([5-9]|\d{2,})|(1[3-9]|[2-9]\d|\d{3,})[_\.]\d+|13[_\.]0|13[_\.]([1-9]|\d{2,})|(1[4-9]|[2-9]\d|\d{3,})[_\.]\d+)(?:[_\.]\d+)?)|(OperaMini(?:\/att)?\/?(\d+)?(?:\.\d+)?(?:\.\d+)?)|(Opera\/.+Opera Mobi.+Version\/(46\.0|46\.([1-9]|\d{2,})|(4[7-9]|[5-9]\d|\d{3,})\.\d+))|(Opera\/(46\.0|46\.([1-9]|\d{2,})|(4[7-9]|[5-9]\d|\d{3,})\.\d+).+Opera Mobi)|(Opera Mobi.+Opera(?:\/|\s+)(46\.0|46\.([1-9]|\d{2,})|(4[7-9]|[5-9]\d|\d{3,})\.\d+))|(SamsungBrowser\/(9\.2|9\.([3-9]|\d{2,})|([1-9]\d|\d{3,})\.\d+|10\.1|10\.([2-9]|\d{2,})|(1[1-9]|[2-9]\d|\d{3,})\.\d+))|(Edge\/(17(?:\.0)?|17(?:\.([1-9]|\d{2,}))?|(1[8-9]|[2-9]\d|\d{3,})(?:\.\d+)?))|(HeadlessChrome((?:\/49\.0\.\d+)?|(?:\/49\.([1-9]|\d{2,})\.\d+)?|(?:\/([5-9]\d|\d{3,})\.\d+\.\d+)?|(?:\/77\.0\.\d+)?|(?:\/77\.([1-9]|\d{2,})\.\d+)?|(?:\/(7[8-9]|[8-9]\d|\d{3,})\.\d+\.\d+)?))|((Chromium|Chrome)\/(49\.0|49\.([1-9]|\d{2,})|([5-9]\d|\d{3,})\.\d+|77\.0|77\.([1-9]|\d{2,})|(7[8-9]|[8-9]\d|\d{3,})\.\d+)(?:\.\d+)?([\d.]+$|.*Safari\/(?![\d.]+ Edge\/[\d.]+$)))|(IEMobile[ \/](11\.0|11\.([1-9]|\d{2,})|(1[2-9]|[2-9]\d|\d{3,})\.\d+))|(Version\/(5\.1|5\.([2-9]|\d{2,})|([6-9]|\d{2,})\.\d+|12\.1|12\.([2-9]|\d{2,})|(1[3-9]|[2-9]\d|\d{3,})\.\d+|13\.0|13\.([1-9]|\d{2,})|(1[4-9]|[2-9]\d|\d{3,})\.\d+)(?:\.\d+)?.*Safari\/)|(Firefox\/(68\.0|68\.([1-9]|\d{2,})|(69|[7-9]\d|\d{3,})\.\d+|70\.0|70\.([1-9]|\d{2,})|(7[1-9]|[8-9]\d|\d{3,})\.\d+)\.\d+)|(Firefox\/(68\.0|68\.([1-9]|\d{2,})|(69|[7-9]\d|\d{3,})\.\d+|70\.0|70\.([1-9]|\d{2,})|(7[1-9]|[8-9]\d|\d{3,})\.\d+)(pre|[ab]\d+[a-z]*)?)/;