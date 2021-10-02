import * as React from 'react';
import { useForm } from 'react-hook-form';

interface FormData {
  title: string;
  author: string;
}

const OtherForms: React.FC<{}> = () => {
  const { register, handleSubmit, errors, formState } = useForm<FormData>({
    mode: 'onChange'
  });

  const onSubmit = (data: FormData): void => console.log(data);

  return (
    <div>
      <h2>タイトル名</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          name='title'
          ref={register({ required: true, maxLength: 20 })}
        />
        {errors.title && '作者名は1文字以上、20文字以下でなければなりません。'}
        <h2>作者名</h2>
        <textarea
          name='author'
          ref={register({ required: true, maxLength: 20 })}
        />
        {errors.author && '作者名は1文字以上、20文字以下でなければなりません。'}
        <button disabled={!formState.isValid}>送信する</button>
      </form>
    </div>
  );
};

export default OtherForms;