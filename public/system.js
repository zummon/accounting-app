const databaseid = {
	"": ["1S9bRkCnI-rVvy4ZxcVPejWBiNpw2lMJeVcOXq_t66Rs"],
	invoice: ["1fFGmZnAJjNvyuF8gC-KuvGKmwj4OtpDu07abKh2i2As"],
};

const datasetid = {
	account: ["1UydCQCoylxCiooiGLYlH_EbFkoKq9eiL8iinB03c37k"],
};

const doGet = (e) => {
	if (e.parameter.api == "json") {
		let data = getData();
		let text = ContentService.createTextOutput(data);
		let json = text.setMimeType(ContentService.MimeType.JSON);
		return json;
	}

	let template = HtmlService.createTemplateFromFile("index");
	let html = template.evaluate();
	return html;
};

// const doPost = (e) => {
// 	let respond = setData(e.body.data);

// 	return respond;
// };

// https://script.google.com/macros/s/AKfycbx2QVrLDxaneu3yNIme-Tdlv79YzU6aW9wRx694Q0Kd/dev?api=json
// https://script.google.com/macros/s/AKfycbx2QVrLDxaneu3yNIme-Tdlv79YzU6aW9wRx694Q0Kd/dev
