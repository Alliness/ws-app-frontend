export class Socket {

    constructor() {

        this.init();
        this.websocket = undefined;
        this.messageHandlers = {};

    }

    addMessageHandler(route, action) {
        if (!this.messageHandlers.hasOwnProperty(route)) {
            this.messageHandlers[route] = [];
        }
        this.messageHandlers[route].push(action);
    }

    init() {
        let _this = this;

        $.getJSON("/app/config").then(function (response) {
            initWebsocket(response.socket);
        });

        function initWebsocket(config) {
            _this.websocket = new WebSocket("ws://" + config.host + ":" + config.port);
            _this.websocket.onopen = function () {
                _this.initSocket();
            };
        }
    }

    initSocket() {
        let _this = this;

        function parseMessage(message) {
            let obj = JSON.parse(message.data);
            if (_this.messageHandlers.hasOwnProperty(obj.route)) {
                $.each(_this.messageHandlers[obj.route], (k, v) => {
                    v(obj.data);
                })
            }
        }

        this.websocket.sendJson = (route, json) => {
            let o = {
                route: route,
                data: json
            };
            _this.websocket.send(JSON.stringify(o));
        };

        this.websocket.onmessage = parseMessage;
        if (this.execute !== undefined)
            this.execute();
    }

    ready(func) {
        this.execute = func;
    }
}
