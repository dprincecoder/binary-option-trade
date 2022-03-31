import React, { useRef, useEffect } from "react";
import "./testimony.css";
import { SliderData } from "./testimonySlideData/Slider";
// import Carousel from "react-multi-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; //
import { Carousel } from "react-responsive-carousel";
// import "react-multi-carousel/lib/styles.css";
const Testimony = () => {
	const slider = useRef(null);
	let currentSlide = 0;
	const autoSlide = () => {
		currentSlide++;
		if (currentSlide === 5) {
			currentSlide = 0;
		}
		slider.current.style.transform = `translateX(-${currentSlide * 400}px)`;
	};
	useEffect(() => {
		setInterval(autoSlide, 10000);
	}, []);
	// const responsive = {
	// 	desktop: {
	// 		breakpoint: { max: 3000, min: 1024 },
	// 		items: 1,
	// 		slidesToSlide: 1, // optional, default to 1.
	// 	},
	// 	tablet: {
	// 		breakpoint: { max: 1024, min: 464 },
	// 		items: 1,
	// 		slidesToSlide: 1, // optional, default to 1.
	// 	},
	// 	mobile: {
	// 		breakpoint: { max: 464, min: 0 },
	// 		items: 1,
	// 		slidesToSlide: 1, // optional, default to 1.
	// 	},
	// };

	return (
		<div className="testimony">
			<div className="plans-tl">
				<h1>Our Happy Clients</h1>
				<div className="plans-tl-btm"></div>
			</div>
			<div className="testimony-grid">
				<div className="testimony-txl">
					<h2>What our clients say!</h2>
					<p>
						REVIEWS ARE FAR MORE IMPORTANT TO US AFTER WITHDRAWAL. Join our{" "}
						<b>Telegram Group</b>{" "}
						<a href="https://t.me/+F-g1dNI485xhNWU0">Here</a> and join others on
						their testimony of investment into cryptocurrency then LET US KNOW
						WHY YOU LOVE Binaryoptionstrading!
					</p>
				</div>
				<div className="testimony-clients ">
					{/* <Carousel
						swipeable={false}
						draggable={false}
						showDots={true}
						responsive={responsive}
						ssr={true} // means to render carousel on server-side.
						infinite={true}
						autoPlay={true}
						autoPlaySpeed={1000}
						keyBoardControl={true}
						customTransition="all .5"
						transitionDuration={500}
						containerClass="carousel-container"
						removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
						// deviceType={this.props.deviceType}
						dotListClass="custom-dot-list-style"
						itemClass="carousel-item-padding-40-px">
						{SliderData.map((item, i) => (
							<div className={`testimony-clients-card `} key={i}>
								<div className="testimony-clients-card-top">
									<div className="testimony-clients-card-top-img-wrapper">
										<img
											src={item.image}
											alt={item.name}
											className="testimony-clients-card-top-img"
										/>
									</div>
									<h2>{item.name}</h2>
								</div>
								<div className="testimony-clients-card-bottom">
									<p>{item.txt}</p>
								</div>
							</div>
						))}
					</Carousel> */}
					{/* <Carousel>
						{SliderData.map((item, i) => (
							<div className={`testimony-clients-card `} key={i}>
								<div className="testimony-clients-card-top">
									<div className="testimony-clients-card-top-img-wrapper">
										<img
											src={item.image}
											alt={item.name}
											className="testimony-clients-card-top-img"
										/>
									</div>
									<h2>{item.name}</h2>
								</div>
								<div className="testimony-clients-card-bottom">
									<p>{item.txt}</p>
								</div>
							</div>
						))}
					</Carousel> */}

					<div className="testimony-clients-slider" ref={slider}>
						{SliderData.map((item, i) => (
							<div className={`testimony-clients-card `} key={i}>
								<div className="testimony-clients-card-top">
									<div className="testimony-clients-card-top-img-wrapper">
										<img
											src={item.image}
											alt={item.name}
											className="testimony-clients-card-top-img"
										/>
									</div>
									<h2>{item.name}</h2>
								</div>
								<div className="testimony-clients-card-bottom">
									<p>{item.txt}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Testimony;
