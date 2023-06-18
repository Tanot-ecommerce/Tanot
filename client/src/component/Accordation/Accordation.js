import React from 'react'
import Collapsible from 'react-collapsible';
import './Accordation.css'

const Accordation = () => {
    return (

        <>
            <div className='acc-wrapper'>
                <Collapsible trigger="DESCRIPTION">
                    <p style={{ textAlign: "left", padding: "2%" }}>
                        For lazy days, for tiring days and all the days which come in between, the need for comfortable loungewear never ends. And thisloungewear set is the best fit for the category. It looks soothing because of the abstract floral prints, and the silhouette defines comfort. Looking good at home is a thing, because when you look good, you mostly end up feeling good too. Put on this cozy and stylish loungewear and binge watch your favourite series after a disgusting day at work.
                    </p>
                </Collapsible>
                <Collapsible trigger="WASHING CARE">
                    <p style={{ textAlign: "left", padding: "2%" }}>
                        Wash garments only when necessary.
                        <br /> We strongly recommend Hand Wash of our products.
                        <br /> Do not put them in a washing machine or dryer.
                        <br /> Do not soak any cotton dress and do not wash with another garment.
                        <br /> Dry inside out in shade.
                        <br />
                        Drying your clothes under the sun causes color-fading. Therefore had them out to dry in evening or in shade.
                    </p>
                </Collapsible>
                <Collapsible trigger="Return & Exchange Policy">
                    <p style={{ textAlign: "left", padding: "2%" }}>
                        Return or exchange request will only be allowed within 5 days from the date of delivery.
                        <br />
                        Return or Exchange request can be placed from the ‘Return or Exchange’ option at the footer of the website or through this link directly.
                        <br />
                        In case of exchange, if you select an item with a higher value compared to the item you're exchanging, we will ask you to pay the price difference. In case the value is lower, we will credit you with the difference.
                        <br />
                        Only after receiving our confirmation for the return, we will schedule a pickup for the order within 1-3 business days of placing the request with no additional costs.
                        <br />
                        Usually we receive the product in 6-7 days. On receiving, within 2-3 days we will issue the store credit or dispatch the exchanged product if all conditions are met.
                        <br />
                        If the item requested for exchange is not available, we will try to give you best possible alternatives or issue a store credit for the same.
                        <br />
                        This process usually takes 10-15 business days.

                    </p>
                </Collapsible>
                <Collapsible trigger="Manufactured & Packaged By">
                    <p style={{ textAlign: "left", padding: "2%" }}>
                    Address of the company
                    </p>
                </Collapsible>
                <Collapsible trigger="For Complaints">
                    <p style={{ textAlign: "left", padding: "2%" }}>
                    please contact us on whatsapp 
                    </p>
                </Collapsible>
            </div>
        </>
    )
}

const data = [
    {
        question: "D E S C R I P T I O N",
        answer: "Lavish living goes hand in hand with beautiful outfits in delicate fabrics. To make that aesthetic dream come true, Jisora has put together a very attractive attire of silk coords in a beautiful lavender shade and tropical print. The fabric looks like best friend even from the tap on a phone. The peplum silhouette adds more to the razzmatazz of the ensemble and no one's complaining! Pair it with a cute pony and kitten heels if casual chic is your go-to vibe. Fabric- Muslin Silk"
    },
    {
        question: "W A S H I N G  C A R E",
        answer: "Wash garments only when necessary. <br /> We strongly recommend Hand Wash of our products.<br /> Do not put them in a washing machine or dryer. <br /> Do not soak any cotton dress and do not wash with another garment. <br /> Dry inside out in shade. <br /> Drying your clothes under the sun causes color-fading. Therefore had them out to dry in evening or in shade."
    },
    {
        question: "M A N U F A C T U R E D  &  P A C K A G E D  B Y",
        answer: "Dhapi India <br /> E-258A 1st & 2nd Floor, Opp. Inland Container Depot, RIICO Industrial Area, Mansarovar, Jaipur - 302020 <br />Contact - 9358935828 <br />GSTIN - 08AATFD7443D1Z7."
    }
];

export default Accordation
