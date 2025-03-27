document.addEventListener('DOMContentLoaded', function() {
    const youtubeUrlInput = document.getElementById('youtube-url');
    const fetchBtn = document.getElementById('fetch-btn');
    const videoInfoSection = document.getElementById('video-info');
    const loadingSection = document.getElementById('loading');
    const downloadProgressSection = document.getElementById('download-progress');
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    
    const thumbnail = document.getElementById('thumbnail');
    const videoTitle = document.getElementById('video-title');
    const videoDuration = document.getElementById('video-duration');
    const videoAuthor = document.getElementById('video-author');
    
    const downloadVideoBtn = document.getElementById('download-video');
    const downloadAudioBtn = document.getElementById('download-audio');
    const videoQualitySelect = document.getElementById('video-quality');
    const audioQualitySelect = document.getElementById('audio-quality');
    
    // Sua chave de API aqui
    const API_KEY = 'SUA_CHAVE_API_AQUI';
    const API_ENDPOINT = 'https://api.exemplo.com/youtube-downloader';
    
    // Função para validar URL do YouTube
    function isValidYoutubeUrl(url) {
        const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
        return youtubeRegex.test(url);
    }
    
    // Função para extrair o ID do vídeo do YouTube
    function extractVideoId(url) {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[7].length === 11) ? match[7] : false;
    }
    
    // Função para buscar informações do vídeo
    async function fetchVideoInfo(videoId) {
        try {
            showLoading(true);
            
            // Aqui você usaria sua API para obter informações do vídeo
            const response = await fetch(`${API_ENDPOINT}/info?videoId=${videoId}&apiKey=${API_KEY}`);
            
            if (!response.ok) {
                throw new Error('Falha ao buscar informações do vídeo');
            }
            
            const data = await response.json();
            
            // Preencher os detalhes do vídeo na interface
            thumbnail.src = data.thumbnailUrl;
            videoTitle.textContent = data.title;
            videoDuration.textContent = `Duração: ${formatDuration(data.duration)}`;
            videoAuthor.textContent = `Canal: ${data.author}`;
            
            showLoading(false);
            videoInfoSection.classList.remove('hidden');
            
            return data;
        } catch (error) {
            showLoading(false);
            alert(`Erro: ${error.message}`);
            console.error(error);
        }
    }
    
    // Função para formatar a duração do vídeo
    function formatDuration(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        } else {
            return `${minutes}:${secs.toString().padStart(2, '0')}`;
        }
    }
    
    // Função para iniciar o download
    async function startDownload(type, quality, videoId) {
        try {
            showLoading(true);
            downloadProgressSection.classList.remove('hidden');
            
            // Configurar o endpoint de download com base no tipo (vídeo ou áudio)
            const downloadEndpoint = `${API_ENDPOINT}/download`;
            
            // Parâmetros para a API
            const params = new URLSearchParams({
                videoId: videoId,
                apiKey: API_KEY,
                format: type,
                quality: quality
            });
            
            // Iniciar o download com monitoramento de progresso
            const response = await fetch(`${downloadEndpoint}?${params}`);
            
            if (!response.ok) {
                throw new Error('Falha ao iniciar o download');
            }
            
            // Simular progresso (em um caso real, você receberia atualizações da API)
            simulateProgress();
            
            const data = await response.json();
            
            // Quando o download estiver pronto, redirecionar para o link de download
            setTimeout(() => {
                window.location.href = data.downloadUrl;
                resetProgress();
                showLoading(false);
            }, 1000);
            
        } catch (error) {
            resetProgress();
            showLoading(false);
            alert(`Erro no download: ${error.message}`);
            console.error(error);
        }
    }
    
    // Função para simular o progresso (em uma implementação real, você receberia atualizações da API)
    function simulateProgress() {
        let progress = 0;
        const interval = setInterval(() => {
            progress += 5;
            updateProgress(progress);
            
            if (progress >= 100) {
                clearInterval(interval);
            }
        }, 200);
    }
    
    // Função para atualizar a barra de progresso
    function updateProgress(percentage) {
        progressFill.style.width = `${percentage}%`;
        progressText.textContent = `${percentage}%`;
    }
    
    // Função para resetar o progresso
    function resetProgress() {
        downloadProgressSection.classList.add('hidden');
        updateProgress(0);
    }
    
    // Função para mostrar/esconder o indicador de carregamento
    function showLoading(show) {
        if (show) {
            loadingSection.classList.remove('hidden');
        } else {
            loadingSection.classList.add('hidden');
        }
    }
    
    // Event Listeners
    fetchBtn.addEventListener('click', async () => {
        const url = youtubeUrlInput.value.trim();
        
        if (!isValidYoutubeUrl(url)) {
            alert('Por favor, insira um URL válido do YouTube');
            return;
        }
        
        const videoId = extractVideoId(url);
        if (videoId) {
            await fetchVideoInfo(videoId);
        } else {
            alert('Não foi possível extrair o ID do vídeo');
        }
    });
    
    downloadVideoBtn.addEventListener('click', () => {
        const url = youtubeUrlInput.value.trim();
        const videoId = extractVideoId(url);
        const quality = videoQualitySelect.value;
        
        if (videoId) {
            startDownload('video', quality, videoId);
        }
    });
    
    downloadAudioBtn.addEventListener('click', () => {
        const url = youtubeUrlInput.value.trim();
        const videoId = extractVideoId(url);
        const quality = audioQualitySelect.value;
        
        if (videoId) {
            startDownload('audio', quality, videoId);
        }
    });
});
