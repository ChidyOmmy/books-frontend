import React from 'react';
import { Editor } from '@toast-ui/react-editor';
import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import chart from '@toast-ui/editor-plugin-chart';
import uml from '@toast-ui/editor-plugin-uml';
import katex from 'katex';

import 'prismjs/themes/prism.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor-plugin-table-merged-cell/dist/toastui-editor-plugin-table-merged-cell.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import '@toast-ui/chart/dist/toastui-chart.css';
import 'katex/dist/katex.min.css';

const ToastEditor = () => {

    return (
        <div>
            Editor down here
            <Editor
                initialValue="Your markdown here"
                previewStyle="vertical"
                height="600px"
                initialEditType="wysiwyg"
                useCommandShortcut={true}
                extendedAutolinks={true}
                plugins={[tableMergedCell, colorSyntax, codeSyntaxHighlight, chart, uml]}
                customHTMLRenderer={{
                    math: (node) => {
                        const html = katex.renderToString(node.literal);

                        return [
                            { type: 'openTag', tagName: 'div', outerNewLine: true },
                            { type: 'html', content: html },
                            { type: 'closeTag', tagName: 'div', outerNewLine: true }
                        ];
                    }
                }}
            />
        </div>
    );
}

export default ToastEditor;
