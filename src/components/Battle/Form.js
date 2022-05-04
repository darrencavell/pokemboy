/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import Box from '../Box/Box';
import BoxList from '../Box/BoxList';
import TextInput from '../Form/TextInput';
import Button from '../Form/Button';

import { mediaQueries } from '../../lib/utils';

const Form = props => {
  const { form, onInput, onOk, onCancel } = props;
  
  return (
    <div css={css`
      position: absolute;
      background-color: #ffffff;
      z-index: 5;
      top: 30%;
      ${mediaQueries[0]} {
        left: 50px;
        right: 50px;
      }
      ${mediaQueries[1]} {
        left: 80px;
        right: 80px;
      }
      max-width: 750px;
    `}>
      <Box>
        <div css={css`
          position: relative;
          background-color: #ffffff;
          z-index: 2;
        `}>
          <BoxList padding="12px 16px 12px">
            <h2>Congratulations</h2>
            <p>You got yourself a new Pokemon, what name would you like to give?</p>
            <TextInput onInput={e => onInput(e.target.value)} height="36px" />
            <p
              css={css`
                color: #ff4d4f;
                font-size: 12px;
                min-height: 14px;
                margin-top: 7px;
                margin-bottom: 0;
                visibility: ${form.error ? 'visible' : 'hidden'}
              `}
            >
              {form.error}
            </p>
            <div css={css`
              margin-top: 16px;
            `}>
              <Button type="primary" color="#ffffff" height="36px" onClick={onOk}>
                Add to the Team
              </Button>
              <Button type="danger" color="#ffffff" height="36px" onClick={onCancel}>
                Release back to the wild
              </Button>
            </div>
          </BoxList>
        </div>
      </Box>
    </div>
  )
}

export default Form;
