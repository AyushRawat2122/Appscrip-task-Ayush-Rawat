import React, { useState } from "react";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { useMediaQuery } from "react-responsive";
import "./footer.css";

export default function Footer() {
    const [open, setOpen] = useState({
        about: false,
        quick: false,
        follow: false,
    });
    const toggle = (key) => setOpen((s) => ({ ...s, [key]: !s[key] }));
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const currencyFlag = "https://static.vecteezy.com/system/resources/previews/000/532/212/original/vector-united-states-of-america-flag-usa-flag-america-flag-background.jpg";
    const paymentImgs = [
        "https://i.pinimg.com/736x/e1/38/b7/e138b7ed5f21ba151bcc6fd2a875fe80.jpg",
        "https://tse2.mm.bing.net/th/id/OIP.5JQOKnSWaJLCnmsdS-fHVQHaE8?pid=Api&P=0&h=180",
        "https://tse1.mm.bing.net/th/id/OIP.EC0ZVKXVpAaaZDPo_I-1ZwHaHa?pid=Api&P=0&h=180",
        "https://tse2.mm.bing.net/th/id/OIP.ZBigH22I1cwW_2WP0Wb9lwHaFj?pid=Api&P=0&h=180",
        "https://logos-world.net/wp-content/uploads/2022/03/Apple-Pay-Logo.jpg",
        "http://goriderep.com/cdn/shop/articles/goride-shop-app.png?v=1656710130",
    ];

    return (
        <footer className="app-footer">
            <div className="footer-top">
                <div className="newsletter">
                    <h3>BE THE FIRST TO KNOW</h3>
                    <p>Sign up for updates from mettā muse.</p>
                    <form
                        className="newsletter-form"
                        onSubmit={(e) => {
                            e.preventDefault();
                            alert("Thanks! (no actual signup in this demo)");
                        }}
                    >
                        <input type="email" placeholder="Enter your e-mail..." required aria-label="Email address" />
                        <button type="submit">SUBSCRIBE</button>
                    </form>
                </div>

                <div className="contact">
                    <h3>CONTACT US</h3>
                    <p>+44 221 133 5360</p>
                    <p>customercare@mettamuse.com</p>

                    <h3 className="currency-title">CURRENCY</h3>
                    <div className="currency">
                        <img src={currencyFlag} alt="US flag" className="flag-img" />
                        <span>USD</span>
                    </div>
                    <p className="small">Transactions will be completed in Euros and a currency reference is available on hover.</p>
                </div>
            </div>

            <hr className="divider" />

            <div className="footer-bottom">
                <div className="col">
                    <button className="col-title mobile-toggle" onClick={() => toggle("about")} aria-expanded={open.about}>
                        mettā muse
                        <IoIosArrowDown className={`caret-icon ${open.about ? "open" : ""}`} />
                    </button>

                    <ul className={`col-list ${open.about ? "open" : ""}`}>
                        <li>About Us</li>
                        <li>Stories</li>
                        <li>Artisans</li>
                        <li>Boutiques</li>
                        <li>Contact Us</li>
                        <li>EU Compliances Docs</li>
                    </ul>
                </div>

                {isMobile && <hr className="mobile-seprator" />}
                <div className="col">
                    <button className="col-title mobile-toggle" onClick={() => toggle("quick")} aria-expanded={open.quick}>
                        QUICK LINKS
                        <IoIosArrowDown className={`caret-icon ${open.quick ? "open" : ""}`} />
                    </button>

                    <ul className={`col-list ${open.quick ? "open" : ""}`}>
                        <li>Orders & Shipping</li>
                        <li>Join/Login as a Seller</li>
                        <li>Payment & Pricing</li>
                        <li>Return & Refunds</li>
                        <li>FAQs</li>
                        <li>Privacy Policy</li>
                        <li>Terms & Conditions</li>
                    </ul>
                </div>

                {isMobile && <hr className="mobile-seprator" />}
                <div className="col">
                    <button className="col-title mobile-toggle" onClick={() => toggle("follow")} aria-expanded={open.follow}>
                        FOLLOW US
                        <IoIosArrowDown className={`caret-icon ${open.follow ? "open" : ""}`} />
                    </button>

                    <div className={`col-list ${open.follow ? "open" : ""}`}>
                        <div className="socials">
                            <a href="#" aria-label="Instagram" className="social-link">
                                <FaInstagram />
                            </a>
                            <a href="#" aria-label="LinkedIn" className="social-link">
                                <FaLinkedinIn />
                            </a>
                        </div>
                    </div>
                    {isMobile && <hr className="mobile-seprator" />}
                    <h4 className="accept-title">mettā muse ACCEPTS</h4>
                    <div className="payments always-visible">
                        {paymentImgs.map((src, i) => (
                            <img src={src} alt={`payment-${i}`} key={i} className="pay-img" />
                        ))}
                    </div>
                </div>

            </div>

            <hr className="divider" />

            <div className="footer-copy">
                <p>Copyright © 2023 mettāmuse. All rights reserved.</p>
            </div>
        </footer>
    );
}