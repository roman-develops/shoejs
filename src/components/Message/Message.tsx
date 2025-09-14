import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

import './message.css';
import './_type/message_type_income.css';
import './_type/message_type_outcome.css';
import './_type/message_type_info.css';
import './_type/message_type_error.css';
import './_size/message_size_expanded.css';

export interface MessageProps {
    text: string;
    type?: 'income' | 'outcome' | 'info' | 'error';
}

const tryParseJson = (str: string) => {
    try {
        return JSON.parse(str);
    } catch {
        return null;
    }
};

const Message = ({ text, type = 'outcome' }: MessageProps) => {
    const typeStyles = new Map<MessageProps['type'], string>([
        ['income', 'message_type_income'],
        ['outcome', 'message_type_outcome'],
        ['info', 'message_type_info'],
        ['error', 'message_type_error'],
    ]);

    const parts = text.split('\n').map((line, i) => {
        const parsed = tryParseJson(line.trim());
        if (parsed) {
            return (
                <SyntaxHighlighter
                    key={i}
                    language="json"
                    style={oneLight}
                    customStyle={{
                        background: 'transparent',
                        borderRadius: '6px',
                        padding: '0.5em 0',
                        fontSize: '0.9em',
                        margin: '0.25em 0',
                    }}
                    codeTagProps={{
                        style: { background: 'transparent' },
                    }}
                >
                    {JSON.stringify(parsed, null, 2)}
                </SyntaxHighlighter>
            );
        }
        return (
            <span key={i}>
                {line}
                <br />
            </span>
        );
    });

    return (
        <div
            className={`message ${typeStyles.get(type)}`}
        >
            {parts}
        </div>
    );
};

export default Message;