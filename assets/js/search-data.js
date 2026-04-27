// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-projects",
          title: "projects",
          description: "A growing collection of your cool projects.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/assets/pdf/Yixuan_Li_CV.pdf";
          },
        },{id: "post-uncertainty-estimation-methods-in-large-language-models-a-taxonomy",
        
          title: "Uncertainty Estimation Methods in Large Language Models - A Taxonomy",
        
        description: "A systematic taxonomy of uncertainty estimation methods for Large Language Models, categorizing key literature from token-level probabilities to semantic clustering and internal state probing.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/UQ/";
          
        },
      },{id: "post-reproduction-and-extension-interpretable-generative-models-through-post-hoc-concept-bottlenecks-cvpr-2025",
        
          title: 'Reproduction and Extension - Interpretable Generative Models through Post-hoc Concept Bottlenecks (CVPR 2025)... <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        
        description: "A blog-style walkthrough of the CVPR 2025 paper on post-hoc concept bottleneck models and their interpretability.",
        section: "Posts",
        handler: () => {
          
            window.open("https://medium.com/@yit020/interpretable-generative-models-through-post-hoc-concept-bottlenecks-cvpr-2025-64b55acd19cd", "_blank");
          
        },
      },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "news-ranked-1st-dev-phase-and-2nd-test-phase-in-the-stp-open-challenge",
          title: 'Ranked 1st (Dev Phase) and 2nd (Test Phase) in the STP Open Challenge....',
          description: "",
          section: "News",},{id: "news-delighted-to-present-our-work-at-the-computational-spatial-multi-omics-symposium-2026-following-our-2nd-place-finish-in-the-stp-open-challenge",
          title: 'Delighted to present our work at the Computational Spatial Multi-Omics Symposium 2026, following...',
          description: "",
          section: "News",},{id: "projects-spatial-transcriptomics-to-proteomics-prediction-stp-challenge",
          title: 'Spatial Transcriptomics to Proteomics Prediction (STP Challenge)',
          description: "STP Open Challenge - Benchmarking Spatial Transriptomics-to-Proteomics Prediction",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_project/";
            },},{id: "projects-statistical-analysis-of-mental-health-outcomes-in-menopausal-women",
          title: 'Statistical Analysis of Mental Health Outcomes in Menopausal Women',
          description: "A rigorous statistical analysis of menopausal women’s mental health using robust testing and confounder adjustment on a confidential population dataset",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_project/";
            },},{id: "projects-project-3-with-very-long-name",
          title: 'project 3 with very long name',
          description: "a project that redirects to another website",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_project/";
            },},{id: "projects-project-4",
          title: 'project 4',
          description: "another without an image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_project/";
            },},{id: "projects-project-5",
          title: 'project 5',
          description: "a project with a background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/5_project/";
            },},{id: "projects-project-6",
          title: 'project 6',
          description: "a project with no image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/6_project/";
            },},{id: "projects-project-7",
          title: 'project 7',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/7_project/";
            },},{id: "projects-project-8",
          title: 'project 8',
          description: "an other project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/projects/8_project/";
            },},{id: "projects-project-9",
          title: 'project 9',
          description: "another project with an image 🎉",
          section: "Projects",handler: () => {
              window.location.href = "/projects/9_project/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%73%68%65%6C%6C%79%6C%69%31%31%30%35@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/ShellyLeee", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/yixuan-li-303663350", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
