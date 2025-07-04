import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import ParallaxHero from '../../components/ParallaxHero/ParallaxHero';
import StoryTimeline from '../../components/StoryTimeline/StoryTimeline';
import AngleSection from '../../components/AngleSection/AngleSection';
import WaveSection from '../../components/WaveSection/WaveSection';
import LazyImage from '../../components/LazyImage/LazyImage';
import diamondTile from '../../assets/diamond-tile.svg';
import Testimonials from '../../components/Testimonials/Testimonials';
import FloatingGlyph from '../../components/FloatingGlyph/FloatingGlyph';
import BackToTop from '../../components/BackToTop/BackToTop';
import AudioToggle from '../../components/AudioToggle/AudioToggle';
import useFocusTrap from '../../utils/useFocusTrap';
import TeachingsWheel from '../../components/TeachingsWheel/TeachingsWheel';
import { teachings as teachingsData } from '../../components/TeachingsWheel/teachingsData';
import KokopelliSection from '../../components/KokopelliSection/KokopelliSection';
import LoveMosaic from '../../components/LoveMosaic/LoveMosaic';

//-------------------- Shared Styled Helpers --------------------//
const Wrapper = styled.main`
  position: relative;
  background: var(--canvas-beige);
  color: var(--dark-brown);
  --section-padding: 110px 20px;

  &::before {
    content: '';
    position: fixed;
    inset: 0;
    background: url(${diamondTile});
    background-size: 180px 180px;
    opacity: 0.04;
    pointer-events: none;
    z-index: -2;
    mix-blend-mode: multiply;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const H2 = styled(motion.h2)`
  font-family: 'UnifrakturCook', cursive;
  font-size: clamp(2rem, 4vw, 3rem);
  margin-bottom: 2rem;
  text-align: center;
  color: var(--dark-brown);
  position: relative;
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -8px;
    width: 0;
    height: 3px;
    background: var(--primary-color,#2d4a3e);
    transform: translateX(-50%);
    animation: expand 1s forwards ease-out;
    animation-delay: 0.3s;
  }
  @keyframes expand {
    to { width: 60px; }
  }
`;

const Section = styled(motion.section)`
  padding: var(--section-padding);
  background: var(--canvas-beige);
`;

//-------------------- Hero --------------------//
/* Removed old hero grid styled components */

//-------------------- Teachings --------------------//
// const TeachGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
//   gap: 2rem;
//   margin-top: 3rem;
// `;
// const Card = styled(motion.div).attrs(()=>({
//   initial:{opacity:0,y:30,scale:0.95},
//   whileInView:{opacity:1,y:0,scale:1},
//   viewport:{once:true,amount:0.2}
// }))`
//   background: #fff;
//   background: linear-gradient(#fff, #fdf9f5);
//   padding: 1.5rem;
//   border-radius: 12px;
//   box-shadow: 0 8px 24px rgba(0,0,0,0.07);
//   text-align: center;
//   transition: transform 0.25s ease;
//   cursor: pointer;
//   &:hover {
//     transform: translateY(-4px) rotate(1.5deg);
//   }
//   will-change: transform;
// `;
const ImpactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;
const Stat = styled.div`
  background:#fafafa;
  padding:1.5rem;
  border-left:4px solid var(--primary-color,#2d4a3e);
  border-radius:8px;
`;
const StatNumber = styled.h3`
  font-size:2.5rem;
  margin-bottom:0.5rem;
  color:var(--primary-color,#2d4a3e);
  animation: pulseGlow 3s ease-in-out infinite;

  @keyframes pulseGlow {
    0% { text-shadow: 0 0 0 rgba(45,74,62,0); }
    50% { text-shadow: 0 0 12px rgba(45,74,62,0.35); }
    100% { text-shadow: 0 0 0 rgba(45,74,62,0); }
  }
`;

// Sticky CTA bar
const StickyBar = styled(motion.div)`
  position: fixed;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--primary-color,#2d4a3e);
  color:#fff;
  padding: 12px 24px;
  border-radius: 40px;
  display:flex;
  gap:16px;
  z-index:120;
  box-shadow:0 4px 14px rgba(0,0,0,0.15);
`;

// -------------------- Modal --------------------//
const Backdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 140;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBox = styled(motion.div)`
  background: #fff;
  color: var(--dark-brown);
  max-width: 600px;
  width: 90%;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  z-index: 150;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.25);
`;

// CTA shared components (must appear before any usage like CtaLight)
const CTAGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

// CTAs now leverage global button utilities
const MotionLink = styled(motion.a)`
  display: inline-block;
`;

// Impact counter animation span
const Count = ({end})=>{
  const [val,setVal]=useState(0);
  useEffect(()=>{
    const dur=1200;
    const startTime=performance.now();
    const step=(t)=>{
      const progress=Math.min((t-startTime)/dur,1);
      setVal(Math.floor(progress*end));
      if(progress<1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  },[end]);
  return <>{val}{typeof end==='number' && end%1!==0?'':''}</>;
};

// define story constant near imports
const kokopelliStory = `The Song of Kokopelli: A Journey Across the Land

As the sun sets over the ancient hoodoos of Alberta and the golden prairie grasses sway in the evening breeze, a mysterious figure appears atop the rocks—humpbacked, flute in hand, silhouetted against the fiery sky.

Chapter 1: The Arrival
Long ago, when the world was young and the land was thirsty, the people of the plains and canyons waited for a sign of hope. One evening, as the sky blazed with the colors of dusk, a haunting melody drifted on the wind. It was Kokopelli, the carrier of seeds, the bringer of music and joy.

He traveled with a sack slung over his back—filled with seeds, stories, and the dreams of all living things. As he walked, his flute sang songs that made the sun shine brighter, the snow melt, and the grass grow tall. Where his shadow passed, wildflowers bloomed and rivers sparkled anew.

Chapter 2: The Gifts of Kokopelli
In every village, Kokopelli's arrival was met with excitement and curiosity. Children would run to greet him, elders would gather to listen, and even the animals would pause to hear his song. He shared not only seeds for planting but also the seeds of wisdom, laughter, and kindness.

Some say his hump was filled with clouds, rainbows, and the promise of rain. Others believe he carried all the songs of the world, trading old melodies for new ones wherever he went. He taught the people to dance and sing, showing them that music could bring rain to parched earth and joy to heavy hearts.

Chapter 3: The Trickster's Lessons
But Kokopelli was not only a bringer of abundance—he was also a playful trickster. He loved to make mischief, hiding seeds in unexpected places or playing pranks that made even the sternest elders laugh. Through his antics, he reminded everyone to never take life too seriously, and that laughter is a medicine as powerful as any plant.

Chapter 4: The Seven Teachings
One night, as the people gathered around a great fire beneath the hoodoos, Kokopelli shared the Seven Teachings—gifts from the ancestors to guide all who walk the land:

• Wisdom (Beaver): Use your gifts wisely and build for the future.
• Love (Eagle): Let your heart soar and care for all creation.
• Respect (Buffalo): Honor the earth and give selflessly.
• Bravery (Bear): Face challenges with courage.
• Honesty (Sabe): Walk tall and speak truth.
• Humility (Wolf): Know your place in the great circle and value the pack over self.
• Truth (Turtle): Carry the teachings with you, slow and steady, and live them every day.

Kokopelli's flute echoed each teaching, weaving them into the hearts of all who listened.

Chapter 5: The Legacy
As dawn approached, Kokopelli prepared to journey on. "Remember," he said, "the seeds I give you are not just for planting in the earth, but for planting in your hearts. Tend them with song, laughter, and kindness—and you will always find abundance, even in the harshest seasons."

With a final, joyful tune, Kokopelli vanished into the sunrise, leaving behind blooming fields, happy children, and a community forever changed by his wisdom.

And so, whenever the wind carries the sound of a distant flute across the Alberta badlands or the desert canyons, people smile and remember: Kokopelli has passed this way, and the world is richer for it.

Click the Kokopelli figure to hear his flute, or hover over each animal in the circle to reveal its teaching. The legend lives on—will you carry it forward?`;

const founderImage = 'https://res.cloudinary.com/dhm8ttqnk/image/upload/v1750431546/founder_yjlzto.jpg';

function About() {
  const [showBar,setShowBar]=useState(false);
  const [selectedTeaching, setSelectedTeaching] = useState(null);
  const modalRef = React.useRef(null);

  useEffect(()=>{
    const onScroll=()=>{setShowBar(window.scrollY>400);} ;window.addEventListener('scroll',onScroll);return()=>window.removeEventListener('scroll',onScroll);},[]);

  // Close modal on Esc key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setSelectedTeaching(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    if (selectedTeaching && modalRef.current) {
      modalRef.current.focus();
    }
  }, [selectedTeaching]);

  useFocusTrap(!!selectedTeaching, modalRef);

  const handlePrev = () => {
    if(selectedTeaching && typeof selectedTeaching.idx === 'number'){
      const prev = (selectedTeaching.idx + teachingsCount -1)%teachingsCount;
      openByIdx(prev);
    }
  };
  const handleNext = () => {
    if(selectedTeaching && typeof selectedTeaching.idx === 'number'){
      const next = (selectedTeaching.idx +1)%teachingsCount;
      openByIdx(next);
    }
  };

  const teachingsCount = teachingsData.length;

  const openByIdx = (i) => {
    const t = teachingsData[i];
    setSelectedTeaching({
      idx: i,
      name: t.name,
      ojibwe: t.ojibwe,
      animal: t.animal,
      desc: t.desc,
      video: t.video,
      img: t.img,
      color: t.color,
    });
  };

  return (
    <Wrapper id="main">
      <FloatingGlyph />
      <BackToTop />
      <AudioToggle />
      <Helmet>
        <title>About – Positive Vibe Tribe</title>
        <meta
          name="description"
          content="Discover how Positive Vibe Tribe weaves the Ojibwe Seven Grandfather Teachings into modern design, spreading positivity across Canada and beyond."
        />
        <meta property="og:title" content="About – Positive Vibe Tribe" />
        <meta property="og:description" content="Discover how Positive Vibe Tribe weaves the Ojibwe Seven Grandfather Teachings into modern design, spreading positivity across Canada and beyond." />
        <meta property="og:image" content="/assets/og-share-1200x630.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About – Positive Vibe Tribe" />
        <meta name="twitter:description" content="Discover how Positive Vibe Tribe weaves the Ojibwe Seven Grandfather Teachings into modern design, spreading positivity across Canada and beyond." />
        <meta name="twitter:image" content="/assets/og-share-1200x630.png" />
      </Helmet>

      {/* Immersive Parallax Hero */}
      <ParallaxHero />

      {/* Mission */}
      <AngleSection parallax angleTop angleBottom id="mission" style={{ background: 'var(--primary-color,#2d4a3e)', color: '#fff', textAlign: 'center' }}>
        <Container>
          <H2 style={{ color: '#fff' }}>Cultivating Positive Vibes from Day One</H2>
          <p style={{ fontSize: '1.15rem', maxWidth: '820px', margin: '0 auto 1.5rem', lineHeight: 1.7 }}>
            We&apos;re a start-up with a big heart. Our first goal is simple: craft comfortable, conversation-starting apparel
            that carries the Seven Grandfather Teachings into everyday life. With every drop we will:
          </p>
          <ul style={{listStyle:'disc',textAlign:'left',maxWidth:'760px',margin:'0 auto 2rem',lineHeight:1.7,fontSize:'1.05rem'}}>
            <li>Celebrate Indigenous wisdom through respectful, authentic design.</li>
            <li>Spark small acts of kindness—wearers become walking reminders of Respect, Love, Courage, Honesty, Wisdom, Humility &amp; Truth.</li>
            <li>Seed our give-back fund, pledging <strong>1 % of first-year sales</strong> to local youth language programs.</li>
          </ul>

          {/* Early-stage impact targets */}
          <ImpactGrid style={{marginBottom:'2rem'}}>
            <Stat style={{background:'rgba(255,255,255,0.1)'}}>
              <StatNumber style={{color:'#fff'}}><Count end={100}/>+</StatNumber>
              <p style={{color:'#fff'}}>Teaching cards shared in our first 3&nbsp;months</p>
            </Stat>
            <Stat style={{background:'rgba(255,255,255,0.1)'}}>
              <StatNumber style={{color:'#fff'}}>$<Count end={1}/>k</StatNumber>
              <p style={{color:'#fff'}}>Micro-grant to an Indigenous-led project by year-end</p>
            </Stat>
            <Stat style={{background:'rgba(255,255,255,0.1)'}}>
              <StatNumber style={{color:'#fff'}}>100<span style={{fontSize:'1.25rem'}}>%</span></StatNumber>
              <p style={{color:'#fff'}}>Compostable mailers before our second drop</p>
            </Stat>
          </ImpactGrid>

          <MotionLink href="/newsletter" className="btn btn-light" whileHover={{scale:1.05}} whileTap={{scale:0.95}}>Grow With Us</MotionLink>
        </Container>
      </AngleSection>

      {/* Testimonials */}
      <Section id="testimonials" initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:0.2}}>
        <Container>
          <H2>What the Tribe Is Saying</H2>
          <Testimonials />
        </Container>
      </Section>

      {/* Kokopelli Section */}
      <KokopelliSection onSelect={setSelectedTeaching} story={kokopelliStory} videoId="fdWqJBfjQ7M" />

      {/* Teachings */}
      <WaveSection id="teachings" waveTop gradient initial={{}}>
        <Container>
          <H2>The Seven Grandfather Teachings</H2>
          <p style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            These sacred principles—shared by the Anishinaabe people—guide everything we do. Each teaching is a
            blueprint for living in harmony with ourselves, our community, and the earth.
          </p>
          <TeachingsWheel onSelect={setSelectedTeaching} />
        </Container>
      </WaveSection>

      {/* Founder Story Full Narrative */}
      <AngleSection id="founder-story" angleBottom initial={false}>
        <Container>
          <H2>The Heart Behind Positive Vibe Tribe: A Founder&apos;s Story of Authentic Connection</H2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))',gap:'3rem',alignItems:'start'}}>
            <LazyImage src={founderImage} alt="Founder" style={{borderRadius:'16px',boxShadow:'0 10px 30px rgba(0,0,0,0.12)',filter:'contrast(105%) saturate(80%)',aspectRatio:'4/5',width:'100%',objectFit:'cover'}} />
            <div style={{fontSize:'1.125rem',lineHeight:1.7}}>
              <h3 style={{marginTop:0}}>When Kindness Meets Business Purpose</h3>
              <p>In an era where authentic storytelling drives customer loyalty and trust, the story of Positive Vibe Tribe&apos;s founder exemplifies how personal values translate into business success. Research shows that stories are 22&nbsp;times more memorable than facts alone, and founder stories enhance perceived brand authenticity by creating emotional connections between the founder&apos;s values and customer values.</p>

              <h3>The Airport Epiphany: Love for No Reason</h3>
              <p>It was a typical travel day in San&nbsp;Antonio when our founder encountered a moment that would crystallize everything Positive Vibe Tribe stands for. Sitting at the airport bar, he noticed a distressed woman who had just missed her flight. What happened next revealed the core philosophy that drives our brand today.</p>
              <p>Despite being met with hostility and profanity when he offered help, our founder persisted with genuine kindness. When the woman angrily questioned why he cared, his response was simple yet profound: <em>&ldquo;I just wanted you to have a better day.&rdquo;</em> Even when she rudely declined his offer to buy her a drink, he quietly paid for it anyway before leaving.</p>
              <p>As she discovered his gesture, her defensive walls began to crumble. His explanation resonated throughout the bar: <strong>&ldquo;If there are people out there who hate for no reason, then I can love for no reason.&rdquo;</strong> The spontaneous applause from fellow travelers confirmed what we know today—authentic kindness creates ripple effects that touch everyone around us.</p>

              <h3>From Personal Values to Brand Mission</h3>
              <p>These encounters shaped the DNA of Positive Vibe Tribe. Our founder&apos;s commitment to spreading unconditional positivity, even in the face of hostility, reflects the deeper Indigenous wisdom that guides our brand. Drawing from traditional Kokopelli teachings—where the fertility deity carries seeds of abundance and joy to communities—and wolf spirit guidance that emphasizes pack loyalty and strength, our founder built a brand that honors these ancient principles while serving modern needs.</p>

              <h3>The Positive Vibe Philosophy in Action</h3>
              <ul>
                <li><strong>Unconditional Kindness:</strong> We design clothing that spreads positive energy without expecting anything in return.</li>
                <li><strong>Community Impact:</strong> A portion of every purchase supports Indigenous communities in Alberta.</li>
                <li><strong>Quality with Purpose:</strong> Premium materials ensure lasting comfort, just as positive energy creates lasting change.</li>
              </ul>

              <h3>The Ripple Effect Continues</h3>
              <p>From that airport bar in San&nbsp;Antonio to gas stations in Alberta, these moments of authentic connection continue to define our brand. Every customer who wears Positive Vibe Tribe becomes part of this story, carrying forward the simple but powerful message: in a world that often chooses negativity, we choose to love for no reason.</p>
              <p><strong>Join the Tribe. Spread the vibes. Change the world, one positive moment at a time.</strong></p>
            </div>
          </div>
        </Container>
      </AngleSection>

      {/* Interactive Story Timeline */}
      <Section id="our-story" style={{ padding: 0 }}>
        <StoryTimeline />
      </Section>

      {/* LOVE Mosaic from our community */}
      <Section id="love-mosaic" initial={{opacity:0, y:40}} whileInView={{opacity:1, y:0}} viewport={{once:true, amount:0.2}}>
        <Container>
          <LoveMosaic />
        </Container>
      </Section>

      {/* Honouring Section */}
      <WaveSection waveBottom id="connection" gradient initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:0.2}}>
        <Container>
          <H2>Honoring Wiikwemkoong</H2>
          <p style={{ maxWidth: '800px', margin: '0 auto 2rem', textAlign: 'center' }}>
            We acknowledge that the Seven Grandfather Teachings originate with the Anishinaabe people of Wiikwemkoong
            Unceded Territory on Manitoulin Island. We remain students—committed to cultural humility, continuous
            learning, and meaningful reciprocity.
          </p>
          <ImpactGrid>
            <Stat style={{background:'rgba(255,255,255,0.1)'}}>
              <StatNumber><Count end={5}/> %</StatNumber>
              <p>Of profits donated to Indigenous youth &amp; language programs in Alberta</p>
            </Stat>
            <Stat style={{background:'rgba(255,255,255,0.1)'}}>
              <StatNumber><Count end={13}/></StatNumber>
              <p>Canadian provinces &amp; territories represented in our Tribe</p>
            </Stat>
            <Stat style={{background:'rgba(255,255,255,0.1)'}}>
              <StatNumber><Count end={100}/> %</StatNumber>
              <p>Ethically sourced, traceable cotton</p>
            </Stat>
          </ImpactGrid>
        </Container>
      </WaveSection>

      {/* Community Impact */}
      <Section id="impact">
        <Container>
          <H2>Community Impact</H2>
          <ImpactGrid>
            <Stat style={{background:'rgba(255,255,255,0.1)'}} as="div">
              <StatNumber>$<Count end={10}/>k+</StatNumber>
              <p>Contributed to Indigenous cultural preservation &amp; land-based healing</p>
            </Stat>
            <Stat style={{background:'rgba(255,255,255,0.1)'}} as="div">
              <StatNumber><Count end={100}/> %</StatNumber>
              <p>Recyclable packaging since launch</p>
            </Stat>
            <Stat style={{background:'rgba(255,255,255,0.1)'}} as="div">
              <StatNumber><Count end={1000}/>s</StatNumber>
              <p>Of teaching cards shipped, sparking conversations coast-to-coast</p>
            </Stat>
          </ImpactGrid>
        </Container>
      </Section>

      {/* Final CTA */}
      <Section style={{ background: 'var(--primary-color,#2d4a3e)', color: '#fff', textAlign: 'center' }}>
        <Container>
          <H2 style={{ color: '#fff' }}>Join the Tribe</H2>
          <p style={{ maxWidth: '600px', margin: '0 auto 2rem', fontSize: '1.25rem' }}>
            Choose the teaching that speaks to your journey and help us spread positivity—one beautifully crafted piece
            at a time.
          </p>
          <CTAGroup style={{ justifyContent: 'center' }}>
            <MotionLink href="/products" className="btn btn-light" whileHover={{scale:1.05}} whileTap={{scale:0.95}}>Shop the Collection</MotionLink>
            <MotionLink href="/newsletter" className="btn btn-outline" whileHover={{scale:1.05}} whileTap={{scale:0.95}}>Get Tribe Updates</MotionLink>
          </CTAGroup>
        </Container>
      </Section>

      {showBar && (
        <StickyBar initial={{opacity:0,scale:0.8}} animate={{opacity:1,scale:1}} exit={{opacity:0}}>
          <MotionLink href="/products" className="btn btn-light" whileHover={{scale:1.05}} whileTap={{scale:0.95}}>Shop the Collection</MotionLink>
          <MotionLink href="/newsletter" className="btn btn-outline" whileHover={{scale:1.05}} whileTap={{scale:0.95}}>Get Tribe Updates</MotionLink>
        </StickyBar>
      )}

      {/* Quote Modal */}
      <AnimatePresence>
        {selectedTeaching && (
          <Backdrop
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedTeaching(null)}
          >
            <ModalBox
              key="modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="teaching-title"
              ref={modalRef}
              tabIndex="-1"
            >
              <h3 id="teaching-title" style={{ marginBottom: '0.75rem', color:selectedTeaching.color }}>
                {selectedTeaching.name}
                {selectedTeaching.ojibwe && ` (${selectedTeaching.ojibwe})`}
                {selectedTeaching.animal && ` – ${selectedTeaching.animal}`}
              </h3>
              <img src={selectedTeaching.img} alt="" style={{width:'120px',height:'120px',borderRadius:'50%',border:`4px solid ${selectedTeaching.color}`,objectFit:'cover',margin:'0 auto 1rem',display:'block'}} />
              <p style={{ marginBottom: '1.25rem', lineHeight: 1.6 }}>{selectedTeaching.desc}</p>
              {selectedTeaching.video && (
                <div style={{position:'relative',paddingBottom:'56.25%',height:0,marginBottom:'1.5rem'}}>
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedTeaching.video}`}
                    title={selectedTeaching.title}
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',border:0}}
                  />
                </div>
              )}
              <div style={{display:'flex',justifyContent:'center',gap:'1.5rem',marginTop:'1rem'}}>
                {typeof selectedTeaching.idx === 'number' && (
                  <MotionLink as="button" onClick={handlePrev}>&larr; Prev</MotionLink>
                )}
                <MotionLink as="button" onClick={() => setSelectedTeaching(null)}>Close</MotionLink>
                {typeof selectedTeaching.idx === 'number' && (
                  <MotionLink as="button" onClick={handleNext}>Next &rarr;</MotionLink>
                )}
              </div>
            </ModalBox>
          </Backdrop>
        )}
      </AnimatePresence>
    </Wrapper>
  );
}

export default About; 