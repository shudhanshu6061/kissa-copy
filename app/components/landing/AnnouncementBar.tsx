export function AnnouncementBar() {
  return (
    <aside className="announcement-bar" role="region" aria-label="Announcement">
      <div className="marquee-track" aria-hidden="true">
        <span className="marquee-set">
          <span className="marquee-msg">DISCOVER YOUR SIGNATURE SCENT</span>
          <span className="marquee-sep" aria-hidden="true">✦</span>
          <span className="marquee-msg">CRAFTED FOR THE MOMENTS THAT MATTER</span>
          <span className="marquee-sep" aria-hidden="true">✦</span>
          <span className="marquee-msg">EXPLORE THE KISSA COLLECTION</span>
          <span className="marquee-sep" aria-hidden="true">✦</span>
          <span className="marquee-msg">A FRAGRANCE. A MEMORY. A STORY.</span>
          <span className="marquee-sep" aria-hidden="true">✦</span>
        </span>
        <span className="marquee-set">
          <span className="marquee-msg">DISCOVER YOUR SIGNATURE SCENT</span>
          <span className="marquee-sep" aria-hidden="true">✦</span>
          <span className="marquee-msg">CRAFTED FOR THE MOMENTS THAT MATTER</span>
          <span className="marquee-sep" aria-hidden="true">✦</span>
          <span className="marquee-msg">EXPLORE THE KISSA COLLECTION</span>
          <span className="marquee-sep" aria-hidden="true">✦</span>
          <span className="marquee-msg">A FRAGRANCE. A MEMORY. A STORY.</span>
          <span className="marquee-sep" aria-hidden="true">✦</span>
        </span>
      </div>
      <span className="sr-only">
        DISCOVER YOUR SIGNATURE SCENT. CRAFTED FOR THE MOMENTS THAT MATTER. EXPLORE THE KISSA COLLECTION. A FRAGRANCE. A MEMORY. A STORY.
      </span>
    </aside>
  );
}
