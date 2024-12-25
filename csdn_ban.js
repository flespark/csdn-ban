// ==UserScript==
// @name         Remove CSDN Links from Search Results
// @namespace    https://github.com/flesaprk/csdn-ban
// @version      0.1
// @description  Remove all CSDN blog links from Google, Bing, and Baidu search results
// @author       Simon Law
// @match        *://www.google.com/search*
// @match        *://www.bing.com/search*
// @match        *://www.baidu.com/s*
// @grant        none
// ==/UserScript==

// (function() {
//     'use strict';

//     function removeCSDNLinks() {
//         // Select all links in search results
//         let links = document.querySelectorAll('a');

//         // Loop through each link and remove if it's from CSDN
//         links.forEach(function(link) {
//             if (link.href.includes('csdn.net')) {
//                 let parentElement = link.closest('div');
//                 if (parentElement) {
//                     parentElement.style.display = 'none';
//                 }
//             }
//         });
//     }

//     // Run the function when the page loads
//     window.addEventListener('load', removeCSDNLinks);

//     // For dynamic content, run the function on DOM changes
//     new MutationObserver(removeCSDNLinks).observe(document.body, {childList: true, subtree: true});
// })();

(function() {
    'use strict';

    // Function to remove CSDN links
    function removeCSDNLinks() {
        // For Google search results
        document.querySelectorAll('div.g').forEach(function(node) {
            if (node.querySelector('a') && node.querySelector('a').href.includes('csdn.net')) {
                node.style.display = 'none';
            }
        });

        // For Bing search results
        document.querySelectorAll('li.b_algo').forEach(function(node) {
            if (node.querySelector('a') && node.querySelector('a').href.includes('csdn.net')) {
                node.style.display = 'none';
            }
        });

        // For Baidu search results
        document.querySelectorAll('div.result').forEach(function(node) {
            if (node.querySelector('a') && node.querySelector('a').href.includes('csdn.net')) {
                node.style.display = 'none';
            } else {
                let csdnSpan = link.querySelector('span');
                if (csdnSpan && csdnSpan.textContent.includes('CSDN博客')) {
                    // Hide the entire search result item
                    let resultItem = link.closest('.c-container') || link.closest('.result');
                    if (resultItem) {
                        resultItem.style.display = 'none';
                    }
                }
            }
        });
    }

    // Observer for dynamic content
    let observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            removeCSDNLinks();
        });
    });

    // Configuration of the observer:
    let config = { childList: true, subtree: true };

    // Start observing the target node for configured mutations
    observer.observe(document.body, config);

    // Initial run
    removeCSDNLinks();
})();

(function() {
    'use strict';

    function removeCSDNLinksFromGoogle() {
        document.querySelectorAll('div.g').forEach(function(node) {
            if (node.querySelector('a') && node.querySelector('a').href.includes('csdn.net')) {
                node.style.display = 'none';
            }
        });
    }

    function removeCSDNLinksFromBing() {
        document.querySelectorAll('li.b_algo').forEach(function(node) {
            if (node.querySelector('a') && node.querySelector('a').href.includes('csdn.net')) {
                node.style.display = 'none';
            }
        });
    }

    function removeCSDNLinksFromBaidu() {
        // Select all links in search results
        let links = document.querySelectorAll('a');

        // Loop through each link and check for the CSDN span tag
        links.forEach(function(link) {
            // Check if the link contains a span with the text "CSDN博客"
            let csdnSpan = link.querySelector('span');
            if (csdnSpan && csdnSpan.textContent.includes('CSDN博客')) {
                // Hide the entire search result item
                let resultItem = link.closest('.c-container') || link.closest('.result');
                if (resultItem) {
                    resultItem.style.display = 'none';
                }
            }
        });
    }

    function removeCSDNLinks() {
        const hostname = window.location.hostname;

        if (hostname.includes('google.')) {
            removeCSDNLinksFromGoogle();
        } else if (hostname.includes('bing.com')) {
            removeCSDNLinksFromBing();
        } else if (hostname.includes('baidu.com')) {
            removeCSDNLinksFromBaidu();
        }
    }

    // Run the function on page load
    window.addEventListener('load', removeCSDNLinks);

    // For dynamic content, run the function on DOM changes
    let observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            removeCSDNLinks();
        });
    });

    // Configuration of the observer:
    let config = { childList: true, subtree: true };

    // Start observing the target node for configured mutations
    observer.observe(document.body, config);
})();