<template>
  <div class="link-preview-container">
    <div class="input-section">
      <input 
        v-model="url" 
        type="url" 
        placeholder="Paste a URL to generate preview..."
        class="url-input"
        @keyup.enter="generatePreview"
      />
      <button @click="generatePreview" class="preview-btn" :disabled="isLoading">
        {{ isLoading ? 'Generating...' : 'Generate Preview' }}
      </button>
    </div>

         <div v-if="preview" class="preview-card">
               <div v-if="preview.image" class="preview-image">
          <img :src="preview.image" :alt="preview.title" />
        </div>
       <div v-else class="preview-image no-image">
         <div class="no-image-placeholder">
           <span>📷</span>
           <p>No preview image available</p>
         </div>
       </div>
      <div class="preview-content">
        <h3 class="preview-title">{{ preview.title }}</h3>
        <p class="preview-description">{{ preview.description }}</p>
        <div class="preview-meta">
          <span class="preview-url">{{ preview.url }}</span>
          <span class="preview-site">{{ preview.siteName }}</span>
        </div>
      </div>
    </div>

    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface PreviewData {
  title: string
  description: string
  image: string
  url: string
  siteName: string
}

const url = ref('')
const preview = ref<PreviewData | null>(null)
const isLoading = ref(false)
const error = ref('')





const generatePreview = async () => {
  if (!url.value) {
    error.value = 'Please enter a URL'
    return
  }

  isLoading.value = true
  error.value = ''
  preview.value = null

  try {
    // Use a CORS proxy to fetch the URL (since browsers block cross-origin requests)
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url.value)}`
    
    const response = await fetch(proxyUrl)
    const data = await response.json()
    
    if (data.contents) {
      const html = data.contents
      const parser = new DOMParser()
      const doc = parser.parseFromString(html, 'text/html')
      
      // Extract meta tags
      const title = doc.querySelector('meta[property="og:title"]')?.getAttribute('content') ||
                   doc.querySelector('meta[name="twitter:title"]')?.getAttribute('content') ||
                   doc.querySelector('title')?.textContent ||
                   doc.querySelector('h1')?.textContent ||
                   doc.querySelector('h2')?.textContent ||
                   new URL(url.value).hostname.replace('www.', '')
      
      const description = doc.querySelector('meta[property="og:description"]')?.getAttribute('content') ||
                         doc.querySelector('meta[name="twitter:description"]')?.getAttribute('content') ||
                         doc.querySelector('meta[name="description"]')?.getAttribute('content') ||
                         doc.querySelector('p')?.textContent?.substring(0, 150) + '...' ||
                         'Website preview available'
      
      const image = doc.querySelector('meta[property="og:image"]')?.getAttribute('content') ||
                   doc.querySelector('meta[name="twitter:image"]')?.getAttribute('content') ||
                   ''
      
      const siteName = doc.querySelector('meta[property="og:site_name"]')?.getAttribute('content') ||
                      new URL(url.value).hostname.replace('www.', '')
      
                     preview.value = {
         title: title.trim(),
         description: description.trim(),
         image: image,
         url: url.value,
         siteName: siteName
       }
    } else {
      error.value = 'Could not fetch URL content'
    }
  } catch (err) {
    error.value = 'Error generating preview. Please check the URL and try again.'
    console.error('Preview generation error:', err)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.link-preview-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

.input-section {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.url-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 2px solid rgba(34, 139, 34, 0.3);
  border-radius: 8px;
  background: rgba(26, 47, 26, 0.1);
  color: #a8d8a8;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.url-input:focus {
  outline: none;
  border-color: #32CD32;
  box-shadow: 0 0 0 3px rgba(50, 205, 50, 0.1);
}

.url-input::placeholder {
  color: rgba(168, 216, 168, 0.6);
}

.preview-btn {
  padding: 0.75rem 1.5rem;
  background: rgba(34, 139, 34, 0.1);
  color: #90EE90;
  border: 1px solid rgba(34, 139, 34, 0.2);
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.preview-btn:hover:not(:disabled) {
  background: rgba(34, 139, 34, 0.15);
  border-color: rgba(34, 139, 34, 0.4);
  transform: translateY(-2px);
}

.preview-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.preview-card {
  background: rgba(26, 47, 26, 0.9);
  border: 1px solid rgba(34, 139, 34, 0.4);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(50, 205, 50, 0.1);
  transition: all 0.3s ease;
}

.preview-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(50, 205, 50, 0.15);
}

.preview-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: rgba(26, 47, 26, 0.5);
}

.preview-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.image-debug {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  z-index: 10;
}

.no-image-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: rgba(168, 216, 168, 0.6);
  text-align: center;
}

.no-image-placeholder span {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.no-image-placeholder p {
  margin: 0;
  font-size: 0.9rem;
}

.preview-card:hover .preview-image img {
  transform: scale(1.05);
}

.preview-content {
  padding: 1.5rem;
}

.preview-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #90EE90;
  margin: 0 0 0.75rem 0;
  line-height: 1.4;
}

.preview-description {
  color: rgba(232, 245, 232, 0.8);
  line-height: 1.6;
  margin: 0 0 1rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.preview-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  color: rgba(168, 216, 168, 0.7);
}

.preview-url {
  max-width: 60%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.preview-site {
  font-weight: 600;
  color: #32CD32;
}

.error-message {
  background: rgba(220, 53, 69, 0.1);
  border: 1px solid rgba(220, 53, 69, 0.3);
  border-radius: 8px;
  padding: 1rem;
  color: #ff6b6b;
  text-align: center;
  margin-top: 1rem;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .link-preview-container {
    padding: 1rem;
  }
  
  .input-section {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .preview-content {
    padding: 1rem;
  }
  
  .preview-title {
    font-size: 1.1rem;
  }
  
  .preview-meta {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }
  
  .preview-url {
    max-width: 100%;
  }
}
</style>
