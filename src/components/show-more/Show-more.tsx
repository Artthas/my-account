import SCSS from './Show-more.module.scss';

type ShowMoreProps = {
  onShowMoreClick(): void,
}

function ShowMore(props: ShowMoreProps): JSX.Element {
  const {onShowMoreClick} = props;

  return (
    <div className="catalog__more">
      <button
        className={SCSS['catalog__button']} type="button"
        onClick={onShowMoreClick}
      >
        Show more
      </button>
    </div>
  );
}

export default ShowMore;
