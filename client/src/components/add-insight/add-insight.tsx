import { BRANDS } from "../../lib/consts.ts";
import { Button } from "../button/button.tsx";
import { Modal, type ModalProps } from "../modal/modal.tsx";
import styles from "./add-insight.module.css";

type AddInsightProps = ModalProps;

export const AddInsight = (props: AddInsightProps) => {
  const addInsight = async (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.target as HTMLFormElement);

    const brand = formData.get("brand");
    const text = formData.get("text");

    const res = await fetch("/api/insights", {
      method: "POST",
      body: JSON.stringify({ brand: Number(brand), text: String(text) }),
    });
    if (!res.ok) {
      console.error("Failed to add insight", res);
    } else {
      props.onClose?.();
    }
  };

  return (
    <Modal {...props}>
      <h1 className={styles.heading}>Add a new insight</h1>
      <form className={styles.form} onSubmit={addInsight}>
        <label className={styles.field}>
          <select className={styles["field-input"]} name="brand">
            {BRANDS.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.field}>
          Insight
          <textarea
            className={styles["field-input"]}
            rows={5}
            placeholder="Something insightful..."
            name="text"
          />
        </label>
        <Button className={styles.submit} type="submit" label="Add insight" />
      </form>
    </Modal>
  );
};
