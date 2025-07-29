import { NodeViewProps, NodeViewWrapper } from '@tiptap/react';
import katex from 'katex';
import React from 'react';
import { useEffect, useState } from 'react';

const KatexNode: React.FC<NodeViewProps> = ({
  node,
  updateAttributes,
  editor,
  getPos,
}) => {
  const { latex, displayMode } = node.attrs;
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(latex);
  const inputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isEditing) {
      // Only sync editValue with latex when NOT editing
      setEditValue(latex);
    }
  }, [latex, isEditing]);

  const handleDoubleClick = () => {
    if (editor.isEditable) {
      setIsEditing(true);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    updateAttributes({ latex: editValue });

    // Focus the editor after updating and position cursor correctly
    setTimeout(() => {
      if (typeof getPos === 'function') {
        const pos = getPos() + node.nodeSize;
        editor.commands.focus(pos);
      } else {
        editor.commands.focus();
      }
    }, 50);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleBlur();
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      setIsEditing(false);
      setTimeout(() => {
        editor.commands.focus();
      }, 50);
    }
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const renderFormula = () => {
    try {
      return (
        <span
          dangerouslySetInnerHTML={{
            __html: katex.renderToString(latex, {
              displayMode,
              throwOnError: false,
            }),
          }}
          className={displayMode ? 'block my-2' : 'inline'}
          style={{ display: displayMode ? 'block' : 'inline' }}
        />
      );
    } catch (error) {
      return <span className="text-red-500">Error rendering formula</span>;
    }
  };

  return (
    <NodeViewWrapper
      as="span"
      className={`katex-node relative ${displayMode ? 'block my-2' : 'inline'}`}
      style={{ display: displayMode ? 'block' : 'inline' }}
      onDoubleClick={handleDoubleClick}
      contentEditable={false}
    >
      {isEditing ? (
        <span className="p-1 border rounded bg-white dark:bg-gray-800 inline-block">
          <input
            ref={inputRef}
            type="text"
            spellCheck={false}
            autoComplete="off"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="min-w-[100px] p-1 border rounded bg-white dark:bg-gray-800 dark:text-white"
          />
        </span>
      ) : (
        renderFormula()
      )}
    </NodeViewWrapper>
  );
};

export default KatexNode;
