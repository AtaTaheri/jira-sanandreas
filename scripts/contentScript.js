if (window.JiraSanAndreas)
    window.JiraSanAndreas();
else {
    window.JiraSanAndreas = () => {
        if (!document.URL.includes('atlassian.net')) return;

        const targetElement = document.querySelector('div[data-test-id="issue.views.issue-base.context.status-and-approvals-wrapper.status-and-approval"]');
        const config = {childList: true, subtree: true};

        const callback = (mutationList, observer) => {

            for (const mutation of mutationList) {
                if (mutation.type !== "childList") continue

                let isDone = false;
                mutation.addedNodes.forEach(node => {
                    if (node instanceof Element && node.hasAttribute("aria-label")) {
                        const attributeValue = node.getAttribute("aria-label");
                        isDone = attributeValue === 'Done - Change status';
                    }
                })
                if (!isDone) continue;

                if (!window.JiraSanAndreasAudio)
                    window.JiraSanAndreasAudio = new Audio(chrome.runtime.getURL("assets/mission_passed.mp3"));

                if (window.JiraSanAndreasAudio.paused)
                    window.JiraSanAndreasAudio.play();

                const overlay = document.createElement("div");
                overlay.style.position = 'absolute';
                overlay.style.top = '0px';
                overlay.style.left = '0px';
                overlay.style.width = '100%';
                overlay.style.height = '100%';
                overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
                overlay.style.zIndex = 9999;
                overlay.style.display = 'flex';
                overlay.style.alignItems = 'center';
                overlay.style.justifyContent = 'center';

                const image = document.createElement("img");
                image.src = chrome.runtime.getURL("assets/mission_passed.png");
                image.style.width = '80%';

                overlay.appendChild(image);

                document.body.appendChild(overlay);

                setTimeout(function (){
                    overlay.remove()
                }, 3500)
            }
        };


        const observer = new MutationObserver(callback);
        observer.observe(targetElement, config);
    }

    window.JiraSanAndreas();
}
