import { useState } from "react";
import { Button } from "../button/button.tsx";
import styles from "./header.module.css";
import { AddInsight } from "../add-insight/add-insight.tsx";

export const HEADER_TEXT = "Suit Tracker Insights";

type HeaderProps = {
  onAddInsight: () => void;
};

export const Header = ({ onAddInsight }: HeaderProps) => {
  const [addInsightOpen, setAddInsightOpen] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.inner}>
          <span className={styles.logo}>{HEADER_TEXT}</span>
          <Button
            label="Add insight"
            theme="secondary"
            onClick={() => {
              setAddInsightOpen(true);
            }}
          />
        </div>
      </header>
      <AddInsight
        open={addInsightOpen}
        onClose={() => {
          setAddInsightOpen(false);
          onAddInsight();
        }}
      />
    </>
  );
};
