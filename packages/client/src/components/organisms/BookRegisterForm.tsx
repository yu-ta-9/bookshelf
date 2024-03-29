import { css } from '@emotion/react';
import * as React from 'react';
import { api } from '../../api/apiFactory';
import { useNotificationBar } from '../customs/UseNotificationBar';
import { Button } from '../atoms/Button';
import { Scanner } from '../atoms/Scanner';
import { TextForm } from '../atoms/TextForm';
import { MAX_WIDTH_SP } from '../../styles/media';

type Props = {
  isbn?: string;
};

const inputArea = css`
  display: flex;
  margin-bottom: 16px;
`;

const textForm = css`
  margin-right: 16px;
`;

const barcodeButtonsWrap = css`
  display: flex;
  margin-bottom: 16px;
`;

const barcodeOpenButton = css`
  margin-right: 16px;
`;

const scannerArea = css`
  padding: 8px;
  border: 1px solid #e4e4e4;
  width: 480px;
  height: 480px;

  @media (max-width: ${MAX_WIDTH_SP}) {
    width: 100%;
  }
`;

export const BookRegisterForm = ({}: Props) => {
  const { notify } = useNotificationBar();
  const [isbn, setIsbn] = React.useState<string>('');
  const [code, setCode] = React.useState<string>('');
  const [openScanner, setOpenScanner] = React.useState<boolean>(false);

  React.useEffect(() => {
    // バーコードから
    (async () => {
      if (!code) {
        return;
      }

      try {
        const response = await api.booksControllerCreateBook({ isbn: code });
        notify(`「${response.data.name}」を登録しました`);
      } catch (e) {
        if (e.response.status === 404) {
          notify('該当する書籍が見つかりませんでした', 'sub');
        } else if (e.response.status === 409) {
          notify('既に登録済みです', 'sub');
        } else {
          notify('ネットワークエラーです', 'sub');
        }
      } finally {
        setOpenScanner(false);
      }
    })();
  }, [code]);

  const handleRegister = async () => {
    try {
      const response = await api.booksControllerCreateBook({ isbn: isbn });
      notify(`「${response.data.name}」を登録しました`);
    } catch (e) {
      if (e.response.status === 404) {
        notify('該当する書籍が見つかりませんでした', 'sub');
      } else if (e.response.status === 409) {
        notify('既に登録済みです', 'sub');
      } else {
        notify('ネットワークエラーです', 'sub');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setIsbn(value);
  };

  const handleOpenScanner = () => {
    setOpenScanner(true);
  };

  const handleCloseScanner = () => {
    setOpenScanner(false);
  };

  return (
    <div>
      <div css={inputArea}>
        <TextForm
          cssProps={textForm}
          value={isbn}
          placeholder="ISBN"
          onChange={handleChange}
        />
        <Button onClick={handleRegister} width={240}>
          手入力で登録
        </Button>
      </div>
      <div css={barcodeButtonsWrap}>
        <Button
          cssProps={barcodeOpenButton}
          onClick={handleOpenScanner}
          width={280}
        >
          バーコード読み取り
        </Button>
        {openScanner && (
          <Button onClick={handleCloseScanner} background="sub">
            閉じる
          </Button>
        )}
      </div>
      <div css={scannerArea}>
        {openScanner ? (
          <Scanner setValue={setCode} />
        ) : (
          <p>「バーコード読み取り」を押下するとカメラが起動します</p>
        )}
      </div>
    </div>
  );
};
