import Image from 'next/image';
import Link from 'next/link';
import FooterClock from './FooterClock';
import { AppleLogo, PlayLogo } from './icons';
import { APP_STORE_URL, LINKEDIN_URL, PLAY_STORE_URL } from '@/lib/site/links';

export default function SiteFooter() {
  return (
    <footer className="footer sec-anim">
      <div className="footer-top">
        <div className="footer-brand">
          <Link className="brand" href="/"><Image src="/img/logo-targetym-dark.avif" alt="Targetym AI" width={384} height={58} /></Link>
          <p className="footer-tag">Le SIRH avec un agent IA dans chaque module, pensé pour l&apos;Afrique francophone.</p>
        </div>
        <nav className="footer-nav" aria-label="Explorer">
          <h3>Explorer</h3>
          <Link href="/solutions">Solutions</Link>
          <Link href="/use-cases">Cas d&apos;usage</Link>
          <Link href="/pricing">Tarifs</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/resources">Vidéos</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <div className="footer-social">
          <h3>Suivez @targetym</h3>
          <div className="socials"><a className="social" href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer"><i className="sn-in" aria-hidden="true">in</i>LinkedIn</a> <a className="social" href="#"><i className="sn-x" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6 5l12 14M18 5L6 19" /></svg></i>X</a> <a className="social" href="#"><i className="sn-ig" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="5" /><circle cx="12" cy="12" r="3.6" /><circle cx="17" cy="7" r="1.1" fill="currentColor" stroke="none" /></svg></i>Instagram</a> <a className="social" href="#"><i className="sn-yt" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M9 7.5v9l7.5-4.5z" fill="currentColor" stroke="none" /></svg></i>YouTube</a> <a className="social" href="#"><i className="sn-fb" aria-hidden="true">f</i>Facebook</a></div>
        </div>
        <div className="footer-go"><Link className="go go-hi" href="/essai-gratuit"><b>Démarrer l&apos;essai gratuit <span className="go-arrow" aria-hidden="true">↗</span></b><i>15 jours, sans carte bancaire</i></Link> <Link className="go" href="/contact"><b>Parler à l&apos;équipe <span className="go-arrow" aria-hidden="true">↗</span></b><i>Réponse sous 24&nbsp;h ouvrées</i></Link> <div className="go go-apps"><b>L&apos;application mobile</b><span className="go-stores"><a className="go-store" href={APP_STORE_URL} target="_blank" rel="noopener noreferrer"><AppleLogo className="go-store-logo" />App Store <span className="go-arrow" aria-hidden="true">↗</span></a> <a className="go-store" href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer"><PlayLogo className="go-store-logo" />Google Play <span className="go-arrow" aria-hidden="true">↗</span></a></span></div></div>
      </div>
      <div className="footer-mark" aria-hidden="true">targetym</div>
      <div className="footer-legal">
        <p>Targetym AI © 2026 · <Link href="/privacy">Confidentialité</Link> · <Link href="/terms">Conditions</Link> · <Link href="/privacy">Cookies</Link></p>
        <p className="footer-credit">Photographies&nbsp;: Unsplash</p>
        <div className="footer-here"><button className="lang" type="button">Français <span aria-hidden="true">◐</span></button> <span>Dakar</span> <FooterClock /> <span className="footer-wx">31&nbsp;°C <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4" /></svg></span></div>
      </div>
    </footer>
  );
}
