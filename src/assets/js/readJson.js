export default function readJson(url, variables_name) {
    const request = new XMLHttpRequest();
    request.open("get", url);
    request.send(null);
    request.onload = () => {
        if (request.status == 200) {
            this.provide(variables_name, JSON.parse(request.responseText));
        }
    }
}