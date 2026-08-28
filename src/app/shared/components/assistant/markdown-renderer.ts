export class AssistantMarkdownRenderer {
  render(markdown: string, copyLabel: string): string {
    let html = this.escapeHtml(markdown).replace(/\x60{3}(\w+)?\n?([\s\S]*?)\x60{3}/g, (_match, language = '', code: string) =>
      '<pre class="assistant-code"><button type="button" class="assistant-copy" data-code-id="0">' + copyLabel +
      '</button><code class="language-' + language + '">' + this.highlightCode(code.trimEnd()) + '</code></pre>');
    html = html
      .replace(/^### (.+)$/gm, '<h4>$1</h4>').replace(/^## (.+)$/gm, '<h3>$1</h3>').replace(/^# (.+)$/gm, '<h2>$1</h2>')
      .replace(/^[-*] (.+)$/gm, '<li>$1</li>').replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*([^*\n]+)\*/g, '<em>$1</em>')
      .replace(/\x60([^\x60\n]+)\x60/g, '<code>$1</code>')
      .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/\n{2,}/g, '</p><p>').replace(/\n/g, '<br>');
    return '<p>' + html + '</p>';
  }

  private escapeHtml(value: string): string {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }

  private highlightCode(code: string): string {
    return code.replace(/\b(const|let|function|return|class|interface|public|private|new|if|else)\b/g, '<span class="token-keyword">$1</span>')
      .replace(/(['"])([^'"]*?)\1/g, '<span class="token-string">$1$2$1</span>')
      .replace(/\b(\d+)\b/g, '<span class="token-number">$1</span>');
  }
}
