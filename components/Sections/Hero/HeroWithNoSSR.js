import dynamic from "next/dynamic";

const HeroWithNoSSR = dynamic(() => import('./Hero'), {
    ssr: false
})

export default () => <HeroWithNoSSR />