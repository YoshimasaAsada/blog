'use client';

import { useEffect } from 'react';

/**
 * 記事本文内の <pre class="mermaid"> をMermaid図としてレンダリングする。
 * 本文はdangerouslySetInnerHTMLで挿入されるため、
 * マウント後にmermaidを動的importして描画する。
 */
export default function MermaidRenderer() {
  useEffect(() => {
    const render = async () => {
      const elements = document.querySelectorAll<HTMLElement>('pre.mermaid');
      if (elements.length === 0) return;

      const mermaid = (await import('mermaid')).default;
      mermaid.initialize({
        startOnLoad: false,
        theme: 'dark',
        securityLevel: 'strict',
      });
      try {
        await mermaid.run({ nodes: Array.from(elements) });
      } catch {
        // 構文エラーの図があってもページ全体は壊さない
      }
    };
    render();
  }, []);

  return null;
}
