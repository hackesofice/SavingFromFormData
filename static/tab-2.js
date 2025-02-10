function showConsole() {
    const consoleElement = document.getElementById('consoleOutput');
    let lastPacketTime = 0; // Track the time of the last packet

    function updateConsole(content) {
        const currentTime = new Date().getTime();
        const timeDiff = currentTime - lastPacketTime;

        if (timeDiff > 700) {
            consoleElement.innerHTML += '<br/><br/>';
        }

        consoleElement.innerHTML += content;
        lastPacketTime = currentTime;
        consoleElement.scrollTop = consoleElement.scrollHeight; // Auto scroll to the bottom
    }

    // Setup WebSocket connection
    const isLocalhost = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
    const protocol = isLocalhost ? 'http' : 'https';
    const domain = isLocalhost ? 'localhost' : document.domain;
    const port = location.port ? ':' + location.port : '';

    const socket = io.connect(`${protocol}://${domain}${port}`);

    socket.on('console_output', function (data) {
        updateConsole(data);
    });

    socket.on('connect', function () {
        console.log('WebSocket Connected');
    });

    socket.on('disconnect', function () {
        console.log('WebSocket Disconnected');
    });
}

showConsole();
