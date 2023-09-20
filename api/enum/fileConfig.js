module.exports = Object.freeze({
    PDF_CONFIG: {
        MAX_SIZE: 100 * 1024 * 1024,
        ALLOWED_EXTENSIONS: ['pdf'],
        ALLOWED_EXTENSIONS_REGEX: /pdf/,
        MIME_TYPES: ['application/pdf'],
        FOLDER_NAME: 'pdfs'
    },
    VIDEO_CONFIG: {
        MAX_SIZE: 200 * 1024 * 1024,
        ALLOWED_EXTENSIONS: ['mp4', 'ogg', 'webm'],
        ALLOWED_EXTENSIONS_REGEX: /mp4|ogg|webm/,
        MIME_TYPES: ['video/mp4', 'video/webm', 'video/ogg'],
        FOLDER_NAME: 'videos'
    },
    AUDIO_CONFIG: {
        MAX_SIZE: 200 * 1024 * 1024,
        ALLOWED_EXTENSIONS: ['mp3', 'ogg', 'wav'],
        ALLOWED_EXTENSIONS_REGEX: /mp3|ogg|wav|mpeg/,
        MIME_TYPES: ['audio/mpeg', 'audio/ogg', 'audio/wav'],
        FOLDER_NAME: 'audios'
    },
    IMAGE_CONFIG: {
        MAX_SIZE: 10 * 1024 * 1024,
        ALLOWED_EXTENSIONS: ['png', 'jpg', 'jpeg', 'gif', 'tiff'],
        ALLOWED_EXTENSIONS_REGEX: /png|jpg|jpeg|gif|tiff/,
        MIME_TYPES: ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/tiff'],
        FOLDER_NAME: 'image'
    },
    XLSX_CONFIG: {
        MAX_SIZE: 10 * 1024 * 1024, 
        ALLOWED_EXTENSIONS: ['xlsx','xls'],
        ALLOWED_EXTENSIONS_REGEX: /xlsx|xls/,
        MIME_TYPES: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
        FOLDER_NAME: 'xlsx'
    },
    DOC_CONFIG: {
        MAX_SIZE: 10 * 1024 * 1024, // Adjust the max size as needed
        ALLOWED_EXTENSIONS: ['doc'],
        ALLOWED_EXTENSIONS_REGEX: /doc/,
        MIME_TYPES: ['application/msword'],
        FOLDER_NAME: 'doc'
    },
    DOCX_CONFIG: {
        MAX_SIZE: 10 * 1024 * 1024, // Adjust the max size as needed
        ALLOWED_EXTENSIONS: ['docx'],
        ALLOWED_EXTENSIONS_REGEX: /docx/,
        MIME_TYPES: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
        FOLDER_NAME: 'docx'
    },
});