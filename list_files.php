<?php
// Define o diretório que você quer listar
$dir = './';  // Diretório raiz (ou altere para o diretório desejado)

// Extensões permitidas
$allowedExtensions = ['css', 'js', 'jpg', 'jpeg', 'png', 'gif', 'html'];

// Função para obter todos os arquivos do diretório com as extensões permitidas
function getDirectoryFiles($dir, $allowedExtensions) {
    $files = [];
    $iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($dir));

    foreach ($iterator as $file) {
        if ($file->isFile()) {
            $extension = strtolower(pathinfo($file->getFilename(), PATHINFO_EXTENSION));

            // Adiciona ao array apenas se a extensão estiver na lista permitida
            if (in_array($extension, $allowedExtensions)) {
                $files[] = str_replace($_SERVER['DOCUMENT_ROOT'], '', $file->getPathname());
            }
        }
    }
    return $files;
}

// Define o cabeçalho como JSON e retorna a lista de arquivos filtrados
header('Content-Type: application/json');
echo json_encode(getDirectoryFiles($dir, $allowedExtensions));
?>
