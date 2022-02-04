import { css } from '@emotion/react';
import * as React from 'react';
import { HTMLTextarea } from '../atoms/HTMLTextarea';
import { TextareaForm } from '../atoms/TextareaForm';

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  showHTML: boolean;
};
const defaultHeight = '400px';

const markdownAndHtmlArea = css`
  position: relative;
  width: 100%;
  max-height: 800px;
  overflow: hidden;
  overflow-y: scroll;
`;

const textFormWrap = (showHTML: boolean) => css`
  height: ${defaultHeight};
  display: ${!showHTML ? 'block' : 'none'};
`;

const htmlTextAreaWrap = (showHTML: boolean) => css`
  height: 100%;
  min-height: ${defaultHeight};
  display: ${showHTML ? 'block' : 'none'};
`;

export const MarkdownAndHTMLArea = ({ value, onChange, showHTML }: Props) => {
  return (
    <div css={markdownAndHtmlArea}>
      <div css={textFormWrap(showHTML)}>
        <TextareaForm value={value} onChange={onChange} />
      </div>
      <div css={htmlTextAreaWrap(showHTML)}>
        <HTMLTextarea value={value} />
      </div>
    </div>
  );
};
