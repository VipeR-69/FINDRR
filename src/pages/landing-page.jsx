import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import React from 'react'
import { Link } from 'react-router-dom'
import companies from "../data/companies.json"
import faqs from "../data/faqs.json"
import Autoplay from 'embla-carousel-autoplay'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const LandingPage = () => {
  return (
    <main className='flex flex-col gap-10 sm:gap-15 py-8 sm:py-15 mt-7'>
        <section className='text-center'>
            <h1 className='flex flex-col items-center justify-center gradient-title font-extrabold sm:text-4xl lg:text-6xl tracking-tight py-4'>
                Land A Job At
                <span>Your Dream Company</span>
            </h1>
            <p className='text-zinc-300 sm:mt-5 text-xs sm:text-xl'>
                Explore Thousands of job lisitng or find the perfect candidate
            </p>
        </section>

        <div className='flex gap-7 justify-center'>
            <Link to="/jobs">
                <Button variant="blue" size="xl">Find Jobs</Button>
            </Link>
            <Link to="/post-job">
                <Button variant="red" size="xl">Post Jobs</Button>
            </Link>
        </div>

        <Carousel
            plugins={[Autoplay({ delay: 2000, stopOnInteraction: true })]}
            className="w-full py-15"
        >
            <CarouselContent className="flex items-center gap-5 sm:gap-20">
                {companies.map(({ name, id, path }) => {
                    return (
                        <CarouselItem key={id} className="basis-1/3 lg:basis-1/6">
                            <img src={path} alt={name} className='h-9 sm:h-14 object-contain' />
                        </CarouselItem>
                    )
                })}
            </CarouselContent>
        </Carousel>

        <section className='flex justify-between items-center'>
            <img src='/banner.png' className='w-180 h-170'/>
            <h1 className='text-6xl gradient-title font-extrabold ml-15'>
                Over 5,00,000+ Candidates,<br />
                Got Their Dream Jobs
            </h1>
        </section>

        <section className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            <Card>
                <CardHeader>
                    <CardTitle className='text-2xl font-bold'>For Job Seekers</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Search and apply for jobs, track applications, and more.</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className='text-2xl font-bold'>For Recruiters</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Post jobs, manage applications, and find the best candidate</p>
                </CardContent>
            </Card>
        </section>

        <Accordion type="single" collapsible>
            {faqs.map((faq, index) => {
                return (
                    <AccordionItem key={index} value={`item-${index + 1}`}>
                        <AccordionTrigger className='text-base cursor-pointer'>{faq.question}</AccordionTrigger>
                        <AccordionContent className='text-base'>{faq.answer}</AccordionContent>
                    </AccordionItem>
                )
            })}

        </Accordion>

    </main>
  )
}

export default LandingPage