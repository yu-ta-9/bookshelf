import { css } from '@emotion/react';
import { KeyboardEvent } from 'react';
import * as React from 'react';

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
};

const textarea = (height: string) => css`
  width: 100%;
  height: ${height};
  padding: 8px;
  tab-size: 2;
  /* スクロールを表示させないために付与 */
  overflow: hidden;
`;

export const TextareaForm = ({ value, onChange, onBlur }: Props) => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const [textareaHeight, setTextareaHeight] = React.useState('auto');

  React.useEffect(() => {
    textareaRef.current.focus();
  }, []);

  React.useEffect(() => {
    setTextareaHeight(`${textareaRef.current!.scrollHeight}px`);
  }, [value]);

  const onTabKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // ref: http://www.webclap-dandy.com/?category=Programing&id=5
    // タブキーが押された時以外は即リターン
    if (e.keyCode != 9) {
      return;
    }

    // タブキーを押したときのデフォルトの挙動を止める
    e.preventDefault();

    // 現在のカーソルの位置と、カーソルの左右の文字列を取得しておく
    const obj = textareaRef.current;
    var cursorPosition = obj.selectionStart;
    var cursorLeft = obj.value.substr(0, cursorPosition);
    var cursorRight = obj.value.substr(cursorPosition, obj.value.length);

    // テキストエリアの中身を、
    // 「取得しておいたカーソルの左側」+「タブ」+「取得しておいたカーソルの右側」
    // という状態にする。
    obj.value = cursorLeft + '\t' + cursorRight;

    // カーソルの位置を入力したタブの後ろにする
    obj.selectionEnd = cursorPosition + 1;
  };

  return (
    <textarea
      css={textarea(textareaHeight)}
      value={value}
      ref={textareaRef}
      onKeyDown={onTabKey}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};
