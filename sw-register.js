if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/webworker/sw.js').then(function(registration) {
            console.log('Service Worker registrado com sucesso:', registration.scope);
        }, function(err) {
            console.log('Falha no registro do Service Worker:', err);
        });
    });
}
