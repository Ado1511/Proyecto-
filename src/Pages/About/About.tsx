import { Card } from "flowbite-react";

const About = () => {
return (
    <div className="flex flex-col items-center justify-start gap-10 " style={{background: `linear-gradient(#ff9846, #ffffff)`}}>
<h1 className="text-4xl font-bold">About Us</h1>
<p className="max-w-4xl text-lg text-center">
        Welcome to our platform! We are passionate about bringing you the best experience with our card collection. Our mission is to provide valuable content and easy-to-use features for all of our users.
    </p>
    <Card className="w-4/5 max-w-lg m-auto">
        <h2 className="text-2xl font-semibold">Our Mission</h2>
        <p>
    Our mission is to  create a space where people can explore, like, and interact with amazing cards. Whether you're looking for inspiration or just browsing, we're here to offer a seamless experience.
        </p>
    </Card>
    <Card className="w-4/5 max-w-lg m-auto">
        <h2 className="text-2xl font-semibold">Our Vision</h2>
        <p>
    We aim to build a community of like-minded individuals who love discovering new things. Our vision is to continuously innovate and bring more features that make your experience even better.
        </p>
</Card> 
    </div>
);
};

export default About;
