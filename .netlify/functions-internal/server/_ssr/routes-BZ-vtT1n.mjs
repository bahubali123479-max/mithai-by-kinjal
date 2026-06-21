import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BZ-vtT1n.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var hero_mithai_default = "/assets/hero-mithai-AIKJ6GG0.jpg";
var SWEETS = [
	{
		id: "mohan-thal",
		name: "Mohan Thal",
		desc: "Traditional Gujarati golden-brown gram flour fudge garnished with almonds and pistachios.",
		price: 16,
		image: "/assets/mohan-thal-D9-tkDsU.png",
		tint: "from-amber-100 to-yellow-50"
	},
	{
		id: "kaju-katli",
		name: "Kaju Katli",
		desc: "Silky cashew diamonds with edible silver leaf.",
		price: 18,
		image: "/assets/kaju-katli---Fg06bF.jpg",
		tint: "from-amber-50 to-amber-100"
	},
	{
		id: "gulab-jamun",
		name: "Gulab Jamun",
		desc: "Warm milk dumplings soaked in cardamom-rose syrup.",
		price: 14,
		image: "/assets/gulab-jamun-DZ5NTw1F.jpg",
		tint: "from-orange-50 to-amber-100"
	},
	{
		id: "ladoo",
		name: "Ladoo (Besan / Motichoor)",
		desc: "Golden gram flour or pearl ladoo with ghee & nuts.",
		price: 14,
		image: "/assets/ladoo-v9D3wnhw.jpg",
		tint: "from-yellow-50 to-amber-100"
	},
	{
		id: "barfi",
		name: "Barfi (Milk / Coconut)",
		desc: "Slow-cooked khoya or coconut barfi, melt-in-mouth.",
		price: 16,
		image: "/assets/barfi-ktelraAg.jpg",
		tint: "from-rose-50 to-amber-50"
	},
	{
		id: "jalebi",
		name: "Jalebi",
		desc: "Crisp saffron spirals dipped in warm sugar syrup.",
		price: 12,
		image: "/assets/jalebi-M6q6Nop3.jpg",
		tint: "from-orange-100 to-yellow-50"
	},
	{
		id: "halwa",
		name: "Halwa (Gajar / Suji)",
		desc: "Carrot or semolina halwa, rich with ghee and dry fruits.",
		price: 13,
		image: "/assets/halwa-B-VvxBxR.jpg",
		tint: "from-red-50 to-amber-100"
	}
];
var WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
var WEB3FORMS_ACCESS_KEY = "3bfba655-2c50-49f0-93f3-89a6590b2969";
var WHATSAPP_NUMBER = "15104023608";
var INSTAGRAM_HANDLE = "yourhandle";
function Index() {
	const [selected, setSelected] = (0, import_react.useState)({});
	const [special, setSpecial] = (0, import_react.useState)("");
	const [mode, setMode] = (0, import_react.useState)("Pickup");
	const [submitted, setSubmitted] = (0, import_react.useState)(null);
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const updateQty = (id, qty) => {
		setSelected((prev) => {
			const next = { ...prev };
			if (qty <= 0) delete next[id];
			else next[id] = qty;
			return next;
		});
	};
	const selectedSweets = SWEETS.filter((s) => (selected[s.id] || 0) > 0);
	const estimate = selectedSweets.reduce((sum, s) => sum + s.price * (selected[s.id] || 0), 0);
	const scrollTo = (id) => {
		document.getElementById(id)?.scrollIntoView({
			behavior: "smooth",
			block: "start"
		});
	};
	const onSubmit = async (e) => {
		e.preventDefault();
		setError(null);
		const lastSubmitTime = localStorage.getItem("last_submit_time");
		const now = Date.now();
		if (lastSubmitTime && now - Number(lastSubmitTime) < 6e4) {
			setError(`Please wait ${Math.ceil((6e4 - (now - Number(lastSubmitTime))) / 1e3)} seconds before submitting another order request.`);
			return;
		}
		const formElement = e.currentTarget;
		const fd = new FormData(formElement);
		const name = String(fd.get("name") || "");
		if (fd.get("botcheck")) {
			setError("Spam submission detected.");
			return;
		}
		const sweetList = selectedSweets.map((s) => {
			const qty = selected[s.id] || 0;
			const weightStr = qty * .5 >= 1 ? `${qty * .5}kg` : `${qty * 500}g`;
			return `${s.name} (${weightStr} - $${s.price * qty})`;
		}).join(", ");
		fd.append("access_key", WEB3FORMS_ACCESS_KEY);
		fd.append("subject", `New Order Request from ${name}`);
		fd.append("from_name", "Mithai by Kinjal Website");
		fd.append("Selected Sweets", sweetList || "(none)");
		fd.append("Special Request (menu)", special);
		fd.append("Estimated minimum total", `$${estimate}`);
		setSubmitting(true);
		try {
			const res = await fetch(WEB3FORMS_ENDPOINT, {
				method: "POST",
				body: fd,
				headers: { Accept: "application/json" }
			});
			const data = await res.json();
			if (!res.ok || !data.success) throw new Error(data.message || "Could not send order. Please try again or WhatsApp us.");
			localStorage.setItem("last_submit_time", String(Date.now()));
			setSubmitted(name || "friend");
			setSelected({});
			setSpecial("");
			formElement.reset();
			window.scrollTo({
				top: 0,
				behavior: "smooth"
			});
		} catch (err) {
			setError(err instanceof Error ? err.message : "Something went wrong.");
		} finally {
			setSubmitting(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[var(--cream)] text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-40 backdrop-blur-md bg-[color-mix(in_oklab,var(--cream)_85%,transparent)] border-b border-[color-mix(in_oklab,var(--saffron)_25%,transparent)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-5 py-4 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-2xl",
							children: "🪔"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-xl font-bold text-[var(--deep-red)]",
							children: "Mithai by Kinjal"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "hidden sm:flex gap-6 text-sm font-medium",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => scrollTo("menu"),
								className: "hover:text-[var(--saffron)]",
								children: "Menu"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => scrollTo("order"),
								className: "hover:text-[var(--saffron)]",
								children: "Order"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => scrollTo("reviews"),
								className: "hover:text-[var(--saffron)]",
								children: "Reviews"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => scrollTo("contact"),
								className: "hover:text-[var(--saffron)]",
								children: "Contact"
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 -z-10",
					style: { background: "radial-gradient(60% 80% at 80% 20%, rgba(255,215,0,0.35), transparent 60%), radial-gradient(50% 70% at 10% 90%, rgba(255,107,0,0.35), transparent 60%), linear-gradient(180deg, #FFF8E7 0%, #FFEEC2 100%)" }
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-5 py-12 md:py-20 grid md:grid-cols-2 gap-10 items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						submitted && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-6 rounded-2xl border-2 border-[var(--saffron)] bg-white p-5 shadow-lg",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "font-display text-2xl font-bold text-[var(--deep-red)]",
								children: [
									"Thank you, ",
									submitted,
									"! 🙏"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: "Your order request is received. I will call/WhatsApp you within a few hours to confirm your order and share payment details (Zelle / Venmo / Cash)."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-2 rounded-full bg-white/70 border border-[var(--saffron)]/40 px-3 py-1 text-xs font-semibold text-[var(--deep-red)] uppercase tracking-wider",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-[var(--saffron)] animate-pulse" }), "Now taking orders in Wesley Chapel"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-4 font-display text-4xl md:text-6xl font-extrabold leading-[1.05] text-[var(--deep-red)]",
							children: [
								"Authentic Homemade ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[var(--saffron)]",
									children: "Indian Mithai"
								}),
								" — Made Fresh in Wesley Chapel, FL"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 text-lg text-muted-foreground max-w-xl",
							children: "Recipes from my grandmother's kitchen, made fresh on your order date with pure ghee, real khoya, and zero shortcuts."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-7 flex flex-wrap gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => scrollTo("order"),
								className: "btn-primary hover:btn-primary-hover",
								children: "Order Now →"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => scrollTo("menu"),
								className: "inline-flex items-center justify-center rounded-full border-2 border-[var(--deep-red)] px-7 py-3 font-semibold text-[var(--deep-red)] hover:bg-[var(--deep-red)] hover:text-white transition",
								children: "See the menu"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "✦ 100% homemade" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "✦ Pure ghee" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "✦ Min order $20" })
							]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-[var(--gold)]/40 to-[var(--saffron)]/40 blur-2xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: hero_mithai_default,
							alt: "Assorted homemade Indian mithai on a brass thali",
							width: 1600,
							height: 1024,
							className: "relative rounded-[2rem] shadow-2xl border-4 border-white object-cover aspect-[4/3]"
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "menu",
				className: "mx-auto max-w-6xl px-5 py-16 md:py-24",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center mb-10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold tracking-widest text-[var(--saffron)] uppercase",
								children: "The Menu"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-4xl md:text-5xl font-bold text-[var(--deep-red)] mt-2",
								children: "Pick your favourites"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-muted-foreground",
								children: "Prices per 500g • Tick what you'd like, then fill the form below."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-5",
						children: SWEETS.map((s) => {
							const qty = selected[s.id] || 0;
							const on = qty > 0;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `group relative rounded-3xl border-2 bg-white p-5 transition shadow-sm hover:-translate-y-1 hover:shadow-xl ${on ? "border-[var(--saffron)] ring-4 ring-[var(--saffron)]/20" : "border-transparent"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-40 rounded-2xl overflow-hidden",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: s.image,
											alt: s.name,
											loading: "lazy",
											width: 512,
											height: 512,
											className: "w-full h-full object-cover group-hover:scale-105 transition duration-500"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 flex items-start justify-between gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-display text-xl font-bold text-[var(--deep-red)]",
											children: s.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-sm text-muted-foreground leading-snug",
											children: s.desc
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "shrink-0 rounded-full bg-[var(--gold)]/30 px-3 py-1 text-sm font-bold text-[var(--deep-red)]",
											children: ["$", s.price * (qty || 1)]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-muted-foreground",
											children: qty > 0 ? `for ${qty * 500 >= 1e3 ? `${qty * 500 / 1e3}kg` : `${qty * 500}g`}` : "per 500g"
										}), on ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 bg-[var(--cream)] rounded-full px-2 py-1 border border-[var(--gold)]/50",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => updateQty(s.id, qty - 1),
													className: "flex h-7 w-7 items-center justify-center rounded-full bg-white text-[var(--deep-red)] border border-[var(--border)] hover:bg-[var(--saffron)] hover:text-white transition font-bold text-sm",
													children: "-"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-sm font-bold text-[var(--deep-red)] min-w-[70px] text-center",
													children: qty * 500 >= 1e3 ? `${qty * 500 / 1e3}kg` : `${qty * 500}g`
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => updateQty(s.id, qty + 1),
													className: "flex h-7 w-7 items-center justify-center rounded-full bg-white text-[var(--deep-red)] border border-[var(--border)] hover:bg-[var(--saffron)] hover:text-white transition font-bold text-sm",
													children: "+"
												})
											]
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => updateQty(s.id, 1),
											className: "inline-flex items-center gap-2 rounded-full bg-[var(--saffron)] px-4 py-1.5 text-sm font-bold text-white shadow-sm hover:bg-[var(--deep-red)] transition",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "+ Add" })
										})]
									})
								]
							}, s.id);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 rounded-3xl bg-white p-5 border-2 border-dashed border-[var(--saffron)]/40",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-lg font-bold text-[var(--deep-red)]",
									children: "Special request"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-sm text-muted-foreground mb-2",
									children: "Something not on the menu? Tell me — kheer, peda, mysore pak, festival platters…"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: special,
									onChange: (e) => setSpecial(e.target.value),
									rows: 3,
									placeholder: "e.g. 1kg mysore pak for Diwali, less sugar please",
									className: "w-full rounded-xl border-2 border-[var(--input)] bg-[var(--cream)] p-3 focus:outline-none focus:border-[var(--saffron)]"
								})
							]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "order",
				className: "bg-gradient-to-b from-[var(--cream)] to-[#FFEFC8] py-16 md:py-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-3xl px-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center mb-10",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-semibold tracking-widest text-[var(--saffron)] uppercase",
									children: "Place your order"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-4xl md:text-5xl font-bold text-[var(--deep-red)] mt-2",
									children: "Tell me what you need"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-muted-foreground",
									children: "I'll call or WhatsApp you within a few hours to confirm and share payment details."
								})
							]
						}),
						selectedSweets.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-6 rounded-2xl bg-white border-2 border-[var(--gold)] p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display font-bold text-[var(--deep-red)]",
									children: "Your selection"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-2 space-y-1 text-sm",
									children: selectedSweets.map((s) => {
										const qty = selected[s.id] || 0;
										const weightStr = qty * .5 >= 1 ? `${qty * .5}kg` : `${qty * 500}g`;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "flex justify-between animate-fade-in",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
												s.name,
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-xs text-muted-foreground",
													children: [
														"(",
														weightStr,
														" - $",
														s.price,
														"/500g)"
													]
												})
											] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-semibold",
												children: ["$", s.price * qty]
											})]
										}, s.id);
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 pt-3 border-t border-dashed flex justify-between text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Estimated minimum total"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-bold text-[var(--deep-red)]",
										children: ["$", estimate]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit,
							className: "rounded-3xl bg-white p-6 md:p-8 shadow-xl border border-[var(--gold)]/30 space-y-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									name: "botcheck",
									className: "hidden",
									style: { display: "none" }
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Full Name",
									required: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										name: "name",
										required: true,
										className: "input",
										placeholder: "Kinjal Sharma"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid sm:grid-cols-2 gap-5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Phone Number",
										required: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											name: "phone",
											type: "tel",
											required: true,
											className: "input",
											placeholder: "(813) 555-0100"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Email",
										required: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											name: "email",
											type: "email",
											required: true,
											className: "input",
											placeholder: "you@example.com"
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Delivery or Pickup",
									required: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex gap-3 flex-wrap",
										children: ["Pickup", "Delivery"].map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: `flex-1 min-w-[140px] cursor-pointer rounded-xl border-2 px-4 py-3 text-center font-semibold transition ${mode === opt ? "border-[var(--saffron)] bg-[var(--saffron)]/10 text-[var(--deep-red)]" : "border-[var(--border)] hover:border-[var(--saffron)]/60"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "radio",
												name: "mode",
												value: opt,
												checked: mode === opt,
												onChange: () => setMode(opt),
												className: "sr-only"
											}), opt === "Pickup" ? "🚗 Pickup" : "🛵 Delivery"]
										}, opt))
									})
								}),
								mode === "Delivery" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Delivery Address",
									required: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										name: "address",
										required: true,
										rows: 2,
										className: "input",
										placeholder: "Street, City, ZIP — within 15 miles of Wesley Chapel"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Preferred Date to Receive Order",
									required: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										name: "date",
										type: "date",
										required: true,
										min: new Date(Date.now() + 864e5).toISOString().slice(0, 10),
										className: "input"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "How did you hear about us?",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										name: "source",
										className: "input",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "",
												children: "Select one…"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "WhatsApp group" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Instagram" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Friend" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Facebook" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Other" })
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Special instructions",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										name: "instructions",
										rows: 3,
										className: "input",
										placeholder: "Less sugar, no nuts, festival packaging, etc."
									})
								}),
								error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-[var(--deep-red)] bg-red-50 border border-red-200 rounded-lg p-3",
									children: error
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									disabled: submitting,
									className: "btn-primary hover:btn-primary-hover w-full disabled:opacity-60",
									children: submitting ? "Sending…" : "Submit Order Request"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-center text-muted-foreground",
									children: "No payment now. I'll contact you to confirm and collect via Zelle, Venmo or Cash."
								})
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "reviews",
				className: "mx-auto max-w-6xl px-5 py-16 md:py-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center mb-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold tracking-widest text-[var(--saffron)] uppercase",
						children: "Kind words"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-4xl md:text-5xl font-bold text-[var(--deep-red)] mt-2",
						children: "Loved by our neighbours"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid md:grid-cols-3 gap-5",
					children: [
						{
							name: "Anjali Patel",
							text: "The kaju katli melts in your mouth — tastes exactly like the one my mum makes back in Ahmedabad. Will order every Diwali!"
						},
						{
							name: "Rohan Mehta",
							text: "Ordered ladoo and gulab jamun for my son's birthday. Everyone asked who made them. Truly homemade quality."
						},
						{
							name: "Deepika Iyer",
							text: "Fresh, not too sweet, and beautifully packed. Kinjal even remembered my husband's diabetes-friendly request. 10/10."
						}
					].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl bg-white p-6 shadow-md border border-[var(--gold)]/40",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[var(--gold)] text-lg",
								children: "★★★★★"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 text-foreground leading-relaxed",
								children: [
									"\"",
									r.text,
									"\""
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-4 font-display font-bold text-[var(--deep-red)]",
								children: ["— ", r.name]
							})
						]
					}, r.name))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "contact",
				className: "bg-[var(--deep-red)] text-[var(--cream)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-4xl px-5 py-16 md:py-20 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-4xl md:text-5xl font-bold text-[var(--gold)]",
							children: "Let's talk sweets"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-[var(--cream)]/80 max-w-xl mx-auto",
							children: "All orders are made fresh. Minimum order $20. Delivery within 15 miles of Wesley Chapel, FL."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap justify-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: `https://wa.me/${WHATSAPP_NUMBER}`,
								target: "_blank",
								rel: "noreferrer",
								className: "inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3 font-bold text-white shadow-lg hover:scale-105 transition",
								children: "💬 WhatsApp us"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: `https://instagram.com/${INSTAGRAM_HANDLE}`,
								target: "_blank",
								rel: "noreferrer",
								className: "inline-flex items-center gap-2 rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] px-7 py-3 font-bold text-white shadow-lg hover:scale-105 transition",
								children: "📸 Instagram"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-10 text-xs text-[var(--cream)]/60",
							children: [
								"© ",
								(/* @__PURE__ */ new Date()).getFullYear(),
								" Mithai by Kinjal · Wesley Chapel, Florida · Made with 🧡"
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        .input {
          width: 100%;
          border-radius: 0.75rem;
          border: 2px solid var(--input);
          background: var(--cream);
          padding: 0.75rem 1rem;
          outline: none;
          transition: border-color 0.15s;
          font: inherit;
          color: inherit;
        }
        .input:focus { border-color: var(--saffron); }
      ` })
		]
	});
}
function Field({ label, required, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "block mb-1.5 font-semibold text-sm text-[var(--deep-red)]",
			children: [
				label,
				" ",
				required && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[var(--saffron)]",
					children: "*"
				})
			]
		}), children]
	});
}
//#endregion
export { Index as component };
