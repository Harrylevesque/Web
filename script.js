// Initialize TinyMCE
tinymce.init({
    selector: '#editor',
    plugins: 'advlist autolink lists link image charmap preview anchor textcolor',
    toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
    setup: (editor) => {
        editor.on('change', () => {
            editor.save();
        });
    }
});

// Save page functionality
function savePage() {
    const content = tinymce.get('editor').getContent();
    const pageName = document.getElementById('page-name').value.trim();
    const tld = document.getElementById('tld').value;
    
    if (!pageName) {
        alert("Please enter a page name.");
        return;
    }

    const titleMatch = content.match(/<p>(.*?)<\/p>/);
    const title = titleMatch ? titleMatch[1] : pageName;
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${pageName}${tld}`;
    a.click();
    
    URL.revokeObjectURL(url);
    alert("Page saved!");
}

// Search functionality
const pages = [];

function searchPages() {
    const searchQuery = document.getElementById('search').value.toLowerCase();
    const results = pages.filter(page => page.name.toLowerCase().includes(searchQuery));
    
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = results.map(page => `<li>${page.name}</li>`).join('');
}
