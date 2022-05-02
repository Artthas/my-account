import styles from './Show-more.module.scss';

type ShowMoreProps = {
  onShowMoreClick(): void,
}

function ShowMore(props: ShowMoreProps): JSX.Element {
  const {onShowMoreClick} = props;

  return (
    <div className={styles.showMore}>
      <button
        className={styles.showMoreButton} type="button"
        onClick={onShowMoreClick}
      >
        Show more
      </button>
    </div>
  );
}

export default ShowMore;
