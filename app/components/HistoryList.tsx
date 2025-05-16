import { Activity, Armchair, ArrowLeftCircle, ArrowRightCircle, Blend, CakeSlice, Car, ChevronsLeftRightEllipsis, CircleEllipsis, Coffee, FishSymbol, FlameKindling, Footprints, Handshake, Heart, Leaf, MessageCircleHeart, Milestone, Palette, Pizza, Pyramid, Snowflake, TramFront, TriangleAlert, User, UtensilsCrossed, Wallet } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import LoadingIcon from "./LoadingIcon";
import { ResultData } from "./ResultData";
import { Button } from "./ui/button";
import * as motion from "motion/react-client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import PrefList from "./PrefList";

export default function HistoryList(props: { survey }) {
  const [result, setResult] = useState<any>(null);    
  const LoadingComp = motion.create(LoadingIcon);
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    nextData(0);
  }, []);

  async function nextData(idx: number) {
    setIndex(idx);
    setResult({ loading: true });

    const reco = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/api/v1/survey/detail/${props.survey.results[idx].survey_id}`, {
      method: "GET",
      headers: {
      "Content-Type": "application/json",
      "accept": "application/json"
      }
    }).then(async (data) => await data.json());

    setResult({
      loading: false,
      preferences: {
        comp: getHumanReadable("companion", reco.preferences.companion),
        style: getHumanReadable("style", reco.preferences.style),
        duration: reco.preferences.duration,
        budget: reco.preferences.budget,
        driving: getHumanReadable("driving", reco.preferences.driving),
        climate: getHumanReadable("climate", reco.preferences.climate),
        cont: getHumanReadable("continent", reco.preferences.continent),
        density: getHumanReadable("density", reco.preferences.density)
      },
      recommendation: reco.recommendation
    });
  }

  return (
    <>
    <div className="flex justify-between lg:justify-start gap-4 items-center">
      <Button
        disabled={index === 0}
        onClick={async () => await nextData(index - 1)}>
        <ArrowLeftCircle size={48} />
      </Button>
        <span className="text-xl">{index + 1} / {props.survey.results.length}</span>
      <Button
        disabled={index === props.survey.results.length - 1}
        onClick={async () => nextData(index + 1)}>
        <ArrowRightCircle size={48} />
      </Button>
    </div>
    {result ? result.loading ? (
      <section className="grow h-full z-30 backdrop-blur-md rounded-lg bg-white border-slate-400 border-1 my-2 p-4 flex items-center justify-center gap-2">
        <LoadingComp animate={{ rotate: 360 }} transition={{ duration: 10, repeat: 3 }} />
        <p className="text-xl">Getting recent results...</p>
      </section>
    ) : (
      <>
        <Accordion type="single" collapsible className="lg:me-4">
          <AccordionItem value="prefer">
            <AccordionTrigger className="rounded-md my-2 text-xl hover:bg-gray-50 px-4 hover:no-underline">
              <h3 className="text-xl border-b-2 border-cyan-600 w-fit">Your Preferences</h3>
            </AccordionTrigger>
            <AccordionContent>
              {result.preferences ? (
                <motion.ul className="lg:flex lg:flex-wrap gap-4 grid grid-cols-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                  <PrefList 
                    type="Companion"
                    icon={result.preferences.comp.icon}
                    value={result.preferences.comp.value} />
                  <PrefList 
                    type="Travel Style"
                    list={result.preferences.style} />
                  <PrefList 
                    type="Duration"
                    icon={<ChevronsLeftRightEllipsis />}
                    value={result.preferences.duration} />
                  <PrefList 
                    type="Budget"
                    icon={<Wallet />}
                    value={result.preferences.budget} />
                  <PrefList 
                    type="Driving"
                    icon={result.preferences.driving.icon}
                    value={result.preferences.driving.value} />
                  <PrefList 
                    type="Continent"
                    icon={result.preferences.cont.icon}
                    value={result.preferences.cont.value} />
                  <PrefList 
                    type="Air Temporature"
                    icon={result.preferences.climate.icon}
                    value={result.preferences.climate.value} />
                  <PrefList 
                    type="Density"
                    icon={result.preferences.density.icon}
                    value={result.preferences.density.value} />
                </motion.ul>
              ) : (
                <motion.div className="text-center flex flex-col justify-center items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                  <h2 className="text-2xl">
                    <TriangleAlert size={48} className="grow min-w-12" strokeWidth={1} />
                    Server Error occured
                  </h2>
                  <p>
                    Try again later. If you encounter this error frequently,
                    <a href="https://github.com/GDGoC-SCHU/Travia_FE/issues">file a bug to the issue tracker</a>.
                  </p>
                </motion.div>
              )}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="recommendation">
            <AccordionTrigger className="rounded-md my-2 text-xl hover:bg-gray-50 px-4 hover:no-underline">
              <h3 className="text-xl border-b-2 border-cyan-600 w-fit">Recommendations</h3>
            </AccordionTrigger>
            <AccordionContent>
              {result.recommendation ? (
                <ResultData data={result.recommendation} />
              ): (
                <div className="text-center flex flex-col justify-center items-center">
                  <h2 className="text-2xl">
                    <TriangleAlert size={48} className="grow min-w-12" strokeWidth={1} />
                    Server Error occured
                  </h2>
                  <p>
                    Try again later. If you encounter this error frequently,
                    <a href="https://github.com/GDGoC-SCHU/Travia_FE/issues">file a bug to the issue tracker</a>.
                  </p>
                </div>
            )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
    </>
    ) : (
      <div className="text-center flex flex-col justify-center items-center">
        <h2 className="text-2xl">
          <TriangleAlert size={48} className="grow min-w-12" strokeWidth={1} />
          Server Error occured
        </h2>
        <p>
          Try again later. If you encounter this error frequently,
          <a href="https://github.com/GDGoC-SCHU/Travia_FE/issues">file a bug to the issue tracker</a>.
        </p>
      </div>
    )}
  </>
  )
}

function getHumanReadable(type: string, value: string|string[]) {
  switch(type) {
    case "companion": {
      switch (value) {
        case "single":
          return {
            icon: <User />,
            value: "without travelmate"
          }
        case "friend":
          return {
            icon: <Handshake />,
            value: "with friend"
          }
        case "sweetheart":
          return {
            icon: <Heart />,
            value: "with sweetheart"
          }
        case "family":
          return {
            icon: <Blend />,
            value: "with family"
          }
        default:
          return {
            icon: <CircleEllipsis />,
            value: value
          }
      }
    }
    case "style": {
      if (Array.isArray(value) 
        && !value[0].includes(",")) {
        return getStyles(value);
      } else {
        return getStyles(value[0].split(","))
      }
    }
    case "driving": {
      if (value === "public_transport") {
        return {
          icon: <TramFront />,
          value: "Take Public Transportation"
        }
      } else {
        return {
          icon: <Car />,
          value: "Drive a Car"
        }
      }
    }
    case "climate": {
      if (value === "snowy") {
        return {
          icon: <Snowflake />,
          value: "Snowy and Cold"
        }
      } else if (value === "fresh") {
        return {
          icon: <Leaf />,
          value: "Fresh"
        }
      } else {
        return {
          icon: <FlameKindling />,
          value: "Warm"
        }
      }
    }
    case "continent": {
      switch(value) {
        case "asia": {
          return {
            icon: <Coffee />,
            value: "Asia"
          }
        }
        case "europe": {
          return {
            icon: <CakeSlice />,
            value: "Europe"
          }
        }
        case "america": {
          return {
            icon: <Pizza />,
            value: "America"
          }
        }
        case "africa": {
          return {
            icon: <Pyramid />,
            value: "Africa"
          }
        }
        case "oceania": {
          return {
            icon: <FishSymbol />,
            value: "Oceania"
          }
        }
        default: {
          return {
            icon: <CircleEllipsis />,
            value: "Anywhere / Others"
          }
        }
      }
    }
    case "density": {
      if (value === "active") {
        return {
          icon: <Activity />,
          value: "Actively or busy"
        }
      } else if (value === "moderate") {
        return {
          icon: <Footprints />,
          value: "In Moderation"
        }
      } else {
        return {
          icon: <Armchair />,
          value: "At your leisure"
        }
      }
    }
    default: {
      return value
    }
  }
}

function getStyles(value: string[]) {
  const styles : {
    icon: ReactNode,
    value: string
  }[] = [];

  value.forEach((item) => {
    switch (item) {
      case "heartful":
        styles.push({
          icon: <MessageCircleHeart />,
          value: item
        });
        break;
      case "activity":
        styles.push({
          icon: <Milestone />,
          value: item
        });
        break;
      case "food":
        styles.push({
          icon: <UtensilsCrossed />,
          value: item
        });
        break;
      case "culture":
        styles.push({
          icon: <Palette />,
          value: item
        });
        break;
      default:
        styles.push({
          icon: <CircleEllipsis />,
          value: item
        });
    }
  });

  return styles;
}