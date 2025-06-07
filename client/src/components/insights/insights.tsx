import { Trash2Icon } from "lucide-react";
import { cx } from "../../lib/cx.ts";
import styles from "./insights.module.css";
import type { Insight } from "../../schemas/insight.ts";
import { findBrandName } from "../../lib/consts.ts";

type InsightsProps = {
  insights: Insight[];
  className?: string;
  onUpdate: () => void;
};

export const Insights = ({ insights, className, onUpdate }: InsightsProps) => {
  const deleteInsight = async (id: number) => {
    const res = await fetch(`/api/insights/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      console.error("Failed to delete insight", res);
    } else {
      onUpdate();
    }
  };

  return (
    <div className={cx(className)}>
      <h1 className={styles.heading}>Insights</h1>
      <div className={styles.list}>
        {insights?.length ? (
          insights.map(({ id, text, createdAt, brand }) => (
            <div className={styles.insight} key={id}>
              <div className={styles["insight-meta"]}>
                <span>{findBrandName(brand)}</span>
                <div className={styles["insight-meta-details"]}>
                  <span>
                    {new Intl.DateTimeFormat("en-AU", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }).format(new Date(createdAt))}
                  </span>
                  <Trash2Icon
                    className={styles["insight-delete"]}
                    onClick={() => deleteInsight(id)}
                  />
                </div>
              </div>
              <p className={styles["insight-content"]}>{text}</p>
            </div>
          ))
        ) : (
          <p>We have no insight!</p>
        )}
      </div>
    </div>
  );
};
