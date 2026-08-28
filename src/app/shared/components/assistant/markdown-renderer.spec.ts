import { describe, expect, it } from 'vitest';

import { AssistantMarkdownRenderer } from './markdown-renderer';

describe('AssistantMarkdownRenderer', () => {
  it('escapes input while preserving supported formatting and safe links', () => {
    const html = new AssistantMarkdownRenderer().render(
      '**Daniel** <script>alert(1)</script> [GitHub](https://github.com/dhbart)',
      'Copy',
    );

    expect(html).toContain('<strong>Daniel</strong>');
    expect(html).toContain('&lt;script&gt;alert(1)&lt;/script&gt;');
    expect(html).toContain('href="https://github.com/dhbart"');
    expect(html).not.toContain('<script>');
  });
});
