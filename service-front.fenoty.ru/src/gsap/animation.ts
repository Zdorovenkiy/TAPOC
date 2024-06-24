import gsap from "gsap";

export function incrementAnimation(el: any, currNumber: number, prevNumber: number, duration: number){ 
    if (prevNumber !== currNumber) {
        gsap.from(el as any, {
            innerText: prevNumber,
            duration: duration,
            snap : {
                innerText: 1
            }
        })
        gsap.to(el as any, {
            innerText: currNumber,
            duration: duration,
            snap : {
                innerText: 1
            }
        })

        prevNumber = currNumber;
    }

    return prevNumber;
}