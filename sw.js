const CACHE_NAME = 'site-cache-v5'; // Alterar a versão quando modificar o Service Worker

// Instalação do Service Worker e cachear os arquivos inicialmente
self.addEventListener('install', function(event) {
    event.waitUntil(
        fetch('/webworker/list_files.php') // Busca os arquivos dinamicamente
            .then(response => response.json())
            .then(files => {
                return caches.open(CACHE_NAME).then(function(cache) {
                    console.log('[Service Worker] Cacheando todos os arquivos:', files);
                    return cache.addAll(files);
                });
            })
    );
});

// Limpar caches antigos quando o novo Service Worker é ativado
self.addEventListener('activate', function(event) {
    const cacheWhitelist = [CACHE_NAME];

    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        console.log('[Service Worker] Excluindo cache antigo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Intercepta as requisições e verifica se os arquivos foram atualizados
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(cachedResponse) {
            // Faz uma requisição para o servidor para verificar se o arquivo foi atualizado
            return fetch(event.request).then(function(networkResponse) {
                // Atualiza o cache com a nova resposta do servidor
                return caches.open(CACHE_NAME).then(function(cache) {
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                });
            }).catch(function() {
                // Caso esteja offline, usa o arquivo em cache
                return cachedResponse;
            });
        })
    );
});
