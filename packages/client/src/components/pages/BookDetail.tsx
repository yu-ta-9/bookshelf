import { css } from '@emotion/react';
import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Book } from '../../api/generated';
import { api } from '../../api/apiFactory';
import { MainTemplate } from '../templates/MainTemplate';
import { BookDetailCard } from '../organisms/BookDetailCard';
import { Button } from '../atoms/Button';
import { STATUS } from '../../api/mappings/status';
import { useNotificationBar } from '../../logics/UseNotificationBar';

const bookDetailWrap = css``;

type Params = {
  id: string;
};

export const BookDetail = () => {
  const { notify } = useNotificationBar();
  const { id } = useParams<Params>();
  const [book, setBook] = React.useState<Book>();
  const navigate = useNavigate();

  const [selectedStatusValue, setSelectedStatusValue] = React.useState<number>(
    STATUS.waiting,
  );
  const [inputMarkdown, setInputMarkDown] = React.useState<string>('');

  React.useEffect(() => {
    (async () => {
      const { data } = await api.booksControllerGetBook(Number(id));
      setBook(data);

      setInputMarkDown(data.memo || '');
      setSelectedStatusValue(data.status);
    })();
  }, []);

  const handleStatusChange = async (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    try {
      // MEMO: e.target.valueの値はawait前後で変わる場合があるので変数に格納して使う
      const selected = Number(e.target.value);
      setSelectedStatusValue(selected);
      const { data } = await api.booksControllerPatchBookStatus(book.id, {
        status: selected,
      });
      notify('ステータスを更新しました');
    } catch (e) {}
  };

  const handleMarkdownChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputMarkDown(e.target.value);
  };

  const handleUpdateMemo = async () => {
    (async () => {
      try {
        const { data } = await api.booksControllerPatchBookMemo(Number(id), {
          memo: inputMarkdown,
        });
        notify('メモが更新されました');
      } catch (e) {}
    })();
  };

  const handleDelete = async () => {
    (async () => {
      try {
        if (confirm(`「${book.name}」を削除しますか？`)) {
          const { data } = await api.booksControllerDeleteBook(Number(id));
          notify('削除しました', 'sub');
          navigate('/');
        }
      } catch (e) {}
    })();
  };

  return (
    <MainTemplate title="書籍詳細">
      <div css={bookDetailWrap}>
        <BookDetailCard
          book={book}
          selectedStatus={selectedStatusValue}
          handleStatusChange={handleStatusChange}
          inputMarkdown={inputMarkdown}
          handleMarkdownChange={handleMarkdownChange}
        />
      </div>
      <Button label="更新" onClick={() => handleUpdateMemo()} width={180} />
      <Button
        label="削除"
        background="sub"
        onClick={() => handleDelete()}
        width={180}
      />
    </MainTemplate>
  );
};
