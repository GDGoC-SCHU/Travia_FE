import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./ui/accordion";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useState } from "react";
import * as motion from "motion/react-client"

export function ResultData(props: { data }) {
    const [index, setIndex] = useState<number>(0);

    return (
        <>
        <div className="flex justify-between lg:justify-start gap-4 items-center">
          <Button
            disabled={index === 0}
            onClick={() => setIndex(index - 1)}>
            <ArrowLeftCircle size={48} />
          </Button>
          <span className="text-xl">{index + 1} / {props.data.length}</span>
          <Button
            disabled={index === props.data.length - 1}
            onClick={() => setIndex(index + 1)}>
            <ArrowRightCircle size={48} />
          </Button>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="flex">
          <div className="pt-4 grow shrink min-w-0">
            <h2 className="text-2xl">
              <span className="text-base block">
                {props.data[index].country}
              </span>
              {props.data[index].city}
            </h2>
            <Accordion type="single" collapsible className="lg:me-4">
              <AccordionItem value="reason">
                <AccordionTrigger className="rounded-md my-2 text-xl hover:bg-gray-50 px-4 hover:no-underline">📝 Reasons to recommend!</AccordionTrigger>
                <AccordionContent>
                  <motion.p className="p-4 bg-blue-50 rounded-md"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                    {props.data[index].reason}
                  </motion.p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="max-w-(--scrollable-max-width) overflow-x-scroll flex gap-2 py-8 px-4 rounded-2xl">
              {Object.keys(props.data[index].schedule).map((day, idx) => (
                <Card className="shadow-xl p-4 shrink-0 w-6/7 lg:w-72" key={idx}>
                  <h3 className="text-xl">Day {day.split("_")[1]}</h3>
                  {props.data[index].schedule[day].map((ev : { time: string, activity: string }, idx: number) => (
                    <p key={idx}>
                      <span className="text-lg block">⌚ {ev.time}</span>
                      <span>{ev.activity}</span>
                    </p>
                  ))}
                </Card>
              ))}
            </div>
          </div>
          <div className="hidden lg:block py-4 shrink-0">
            <motion.img initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }}
              src={`https://maps.googleapis.com/maps/api/staticmap?center=${props.data[index].country}+${props.data[index].city}&zoom=12&size=250x250&key=${import.meta.env.VITE_GOOGLE_API_KEY}`}
              alt={`${props.data[index].city} 지도`} className="rounded-xl aspect-square" />
          </div>
        </motion.div>
        </>
    )
}