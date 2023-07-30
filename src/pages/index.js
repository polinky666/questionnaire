import { useForm } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message";
import { Container, Input, TextField } from "@mui/material";
import { db } from '../config/firebase';
import { collection, addDoc } from "firebase/firestore";

export default function Home() {
  //const { register, handleSubmit } = useForm();
  const { register, formState: { errors }, handleSubmit, watch } = useForm({
    criteriaMode: "all"
  });
  const onSubmit = data => {
    console.log('submitted', data)
    addDoc(collection(db, 'response'), {
      name: data.name || "",
      dateOfBirth: data.dateOfBirth,
      learning: data.learning,
      learned: data.learned,
      learnedLang: data.learnedLang || ""
    });
  }
  const leaningValue = watch("learning")
  const leanedValue = watch("learned")
  return (
    <>
      <Container fixed>
        <h1>プログラミング学習に関するアンケート</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name">Q1. 名前を入力してください（匿名可）。</label>
            <Input id='name' placeholder="名前" {...register('name')} />
          </div>
          <div>
            <label htmlFor="dateOfBirth">Q2.生年月日を入力して下さい。*</label>
            <Input id="dateOfBirth" placeholder="生年月日" {...register('dateOfBirth',
              {
                required: "*がついた項目は必須です", pattern: { value: /^[0-9]{8}/, message: '8桁の数字で入力して下さい' },
              })} />
            <ErrorMessage
              errors={errors}
              name="dateOfBirth"
              render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <p key={type}>{message}</p>
                ))
              }
            />
          </div>
          <div>
            <label htmlFor="learning">Q3.現在、プログラミングを学習していますか？*</label>
            <input id="learning1" {...register("learning", { required: "*がついた項目は必須です" })} type="radio" name="learning" value="yes" />はい
            <input id="learning2" {...register("learning", { required: "*がついた項目は必須です" })} type="radio" name="learning" value="no" />いいえ
            <input id="learning3" {...register("learning", { required: "*がついた項目は必須です" })} type="radio" name="learning" value="noIdea" />わからない
            <ErrorMessage
              errors={errors}
              name="learning"
              render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <p key={type}>{message}</p>
                ))
              }
            />
          </div>
          <div>
            <label htmlFor="learned">Q4.これまでに、プログラミングを学習したことがありますか？*</label>
            <input id="learned1" {...register("learned", { required: "*がついた項目は必須です" })} type="radio" name="learned" value="yes" />はい
            <input id="learned2" {...register("learned", { required: "*がついた項目は必須です" })} type="radio" name="learned" value="no" />いいえ
            <input id="learned3" {...register("learned", { required: "*がついた項目は必須です" })} type="radio" name="learned" value="noIdea" />わからない
            <ErrorMessage
              errors={errors}
              name="learned"
              render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <p key={type}>{message}</p>
                ))
              }
            />
          </div>
          {(leanedValue === "yes" || leaningValue === "yes") &&
            (<div>
              <label htmlFor="learnedLang">Q5.今まで学習したことのあるプログラミング言語をすべて教えてください。</label><br />
              <TextField
                label="学習したことのあるプログラミング言語をすべて記入してください。"
                id="learnedLang"
                placeholder="subete"
                margin="normal"
                fullWidth
                {...register("learnedLang")} />
            </div>)
          }
          <input type="submit" value="アンケートを提出する" />
        </form>
      </Container >
    </>
  )
}
