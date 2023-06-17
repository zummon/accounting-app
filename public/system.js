const source = {
	"": ["1S9bRkCnI-rVvy4ZxcVPejWBiNpw2lMJeVcOXq_t66Rs"],
	invoice: ["1fFGmZnAJjNvyuF8gC-KuvGKmwj4OtpDu07abKh2i2As"],
	accounts: ["1UydCQCoylxCiooiGLYlH_EbFkoKq9eiL8iinB03c37k"],
	names: ["108gT2so0W2R6uEXpsMigngr_4yzFq6NKddQKCziGcCg"],
};

const doGet = (e) => {
	if (e.parameter.get == "data") {
		let data = getData({ source });
		let text = ContentService.createTextOutput(data);
		let json = text.setMimeType(ContentService.MimeType.JSON);
		return json;
	}

	let template = HtmlService.createTemplateFromFile("index");
	let html = template.evaluate();
	return html;
};
