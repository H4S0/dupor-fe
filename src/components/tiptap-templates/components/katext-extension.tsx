import { TextSelection } from '@tiptap/pm/state';
import { mergeAttributes, ReactNodeViewRenderer } from '@tiptap/react';
import KatexNode from './katex-node';
import { Node } from '@tiptap/core';

export interface KatexOptions {
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    katex: {
      insertKatex: (attributes?: {
        latex: string;
        displayMode?: boolean;
      }) => ReturnType;
    };
  }
}

export const KatexExtension = Node.create<KatexOptions>({
  name: 'katex',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  group: 'inline', // Ensure it's inline
  inline: true, // Explicitly mark as inline
  atom: true, // Keep as atom to treat as single unit

  addAttributes() {
    return {
      latex: {
        default: '',
      },
      displayMode: {
        default: false,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-katex]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      mergeAttributes(this.options.HTMLAttributes, {
        'data-katex': '',
        'data-latex': HTMLAttributes.latex,
        'data-display-mode': HTMLAttributes.displayMode,
      }),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(KatexNode);
  },

  addCommands() {
    return {
      insertKatex:
        (attributes = { latex: '', displayMode: false }) =>
        ({ chain, state }) => {
          return chain()
            .insertContent({
              type: this.name,
              attrs: attributes,
            })
            .command(({ tr }) => {
              const pos = tr.selection.anchor;
              const nodeSize = 1; // For atom nodes
              tr.setSelection(TextSelection.create(tr.doc, pos + nodeSize));
              return true;
            })
            .run();
        },
    };
  },
});
