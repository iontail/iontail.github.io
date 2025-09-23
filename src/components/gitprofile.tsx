import { useCallback, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { formatDistance } from 'date-fns';
import {
  CustomError,
  GENERIC_ERROR,
  INVALID_CONFIG_ERROR,
  INVALID_GITHUB_USERNAME_ERROR,
  setTooManyRequestError,
} from '../constants/errors';
import '../assets/index.css';
import { getInitialTheme, getSanitizedConfig, setupHotjar } from '../utils';
import { SanitizedConfig } from '../interfaces/sanitized-config';
import ErrorPage from './error-page';
import { DEFAULT_THEMES } from '../constants/default-themes';
import ThemeChanger from './theme-changer';
import { MdLocationOn } from 'react-icons/md';
import { FaBuilding, FaLinkedin } from 'react-icons/fa';
import { AiFillGithub } from 'react-icons/ai';
import { RiMailFill } from 'react-icons/ri';
import { BG_COLOR, FALLBACK_IMAGE } from '../constants';
import AvatarCard from './avatar-card';
import { Profile } from '../interfaces/profile';
import DetailsCard from './details-card';
import SkillCard from './skill-card';
import ExperienceCard from './experience-card';
import EducationCard from './education-card';
import CertificationCard from './certification-card';
import { GithubProject } from '../interfaces/github-project';
import GithubProjectCard from './github-project-card';
import ExternalProjectCard from './external-project-card';
import BlogCard from './blog-card';
import Footer from './footer';
import PublicationCard from './publication-card';

/**
 * Renders the GitProfile component.
 *
 * @param {Object} config - the configuration object
 * @return {JSX.Element} the rendered GitProfile component
 */
const GitProfile = ({ config }: { config: Config }) => {
  const [sanitizedConfig] = useState<SanitizedConfig | Record<string, never>>(
    getSanitizedConfig(config),
  );
  const [theme, setTheme] = useState<string>(DEFAULT_THEMES[0]);
  const [error, setError] = useState<CustomError | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [githubProjects, setGithubProjects] = useState<GithubProject[]>([]);

  const getGithubProjects = useCallback(
    async (publicRepoCount: number): Promise<GithubProject[]> => {
      if (sanitizedConfig.projects.github.mode === 'automatic') {
        if (publicRepoCount === 0) {
          return [];
        }

        const excludeRepo =
          sanitizedConfig.projects.github.automatic.exclude.projects
            .map((project) => `+-repo:${project}`)
            .join('');

        const query = `user:${sanitizedConfig.github.username}+fork:${!sanitizedConfig.projects.github.automatic.exclude.forks}${excludeRepo}`;
        const url = `https://api.github.com/search/repositories?q=${query}&sort=${sanitizedConfig.projects.github.automatic.sortBy}&per_page=${sanitizedConfig.projects.github.automatic.limit}&type=Repositories`;

        const repoResponse = await axios.get(url, {
          headers: { 'Content-Type': 'application/vnd.github.v3+json' },
        });
        const repoData = repoResponse.data;

        return repoData.items;
      } else {
        if (sanitizedConfig.projects.github.manual.projects.length === 0) {
          return [];
        }
        const repos = sanitizedConfig.projects.github.manual.projects
          .map((project) => `+repo:${project}`)
          .join('');

        const url = `https://api.github.com/search/repositories?q=${repos}+fork:true&type=Repositories`;

        const repoResponse = await axios.get(url, {
          headers: { 'Content-Type': 'application/vnd.github.v3+json' },
        });
        const repoData = repoResponse.data;

        return repoData.items;
      }
    },
    [
      sanitizedConfig.github.username,
      sanitizedConfig.projects.github.mode,
      sanitizedConfig.projects.github.manual.projects,
      sanitizedConfig.projects.github.automatic.sortBy,
      sanitizedConfig.projects.github.automatic.limit,
      sanitizedConfig.projects.github.automatic.exclude.forks,
      sanitizedConfig.projects.github.automatic.exclude.projects,
    ],
  );

  const loadData = useCallback(async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `https://api.github.com/users/${sanitizedConfig.github.username}`,
      );
      const data = response.data;

      setProfile({
        avatar: data.avatar_url,
        name: data.name || ' ',
        bio: data.bio || '',
        location: data.location || '',
        company: data.company || '',
      });

      if (!sanitizedConfig.projects.github.display) {
        return;
      }

      setGithubProjects(await getGithubProjects(data.public_repos));
    } catch (error) {
      handleError(error as AxiosError | Error);
    } finally {
      setLoading(false);
    }
  }, [
    sanitizedConfig.github.username,
    sanitizedConfig.projects.github.display,
    getGithubProjects,
  ]);

  useEffect(() => {
    if (Object.keys(sanitizedConfig).length === 0) {
      setError(INVALID_CONFIG_ERROR);
    } else {
      setError(null);
      setTheme(getInitialTheme(sanitizedConfig.themeConfig));
      setupHotjar(sanitizedConfig.hotjar);
      loadData();
    }
  }, [sanitizedConfig, loadData]);

  useEffect(() => {
    theme && document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleError = (error: AxiosError | Error): void => {
    console.error('Error:', error);

    if (error instanceof AxiosError) {
      try {
        const reset = formatDistance(
          new Date(error.response?.headers?.['x-ratelimit-reset'] * 1000),
          new Date(),
          { addSuffix: true },
        );

        if (typeof error.response?.status === 'number') {
          switch (error.response.status) {
            case 403:
              setError(setTooManyRequestError(reset));
              break;
            case 404:
              setError(INVALID_GITHUB_USERNAME_ERROR);
              break;
            default:
              setError(GENERIC_ERROR);
              break;
          }
        } else {
          setError(GENERIC_ERROR);
        }
      } catch (innerError) {
        setError(GENERIC_ERROR);
      }
    } else {
      setError(GENERIC_ERROR);
    }
  };

  return (
    <div className="fade-in h-screen">
      {error ? (
        <ErrorPage
          status={error.status}
          title={error.title}
          subTitle={error.subTitle}
        />
      ) : (
        <>
          <div className={`p-4 lg:p-10 min-h-full ${BG_COLOR}`}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 rounded-box">
              <div className="col-span-1">
                <div className="grid grid-cols-1 gap-6">
                  {sanitizedConfig.themeConfig.disableSwitch ? (
                    sanitizedConfig.themeConfig.bannerImageUrl ? (
                      <div className="card shadow-lg card-sm bg-base-100 overflow-hidden">
                        <div className="relative w-full" style={{ paddingTop: '150%' }}>
                          <img
                            src={sanitizedConfig.themeConfig.bannerImageUrl}
                            alt="banner"
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                          {!loading && profile && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-base-content">
                              <img
                                src={profile.avatar ? profile.avatar : FALLBACK_IMAGE}
                                alt={profile.name}
                                className={`w-48 h-48 rounded-full ${sanitizedConfig.themeConfig.displayAvatarRing ? 'ring-3 ring-primary ring-offset-base-100 ring-offset-2' : ''} shadow`}
                              />
                              <div className="mt-4 w-full px-4">
                                <div className="max-w-3xl mx-auto px-6 py-3 rounded-xl bg-base-100/90 backdrop-blur border border-base-300 shadow text-center">
                                  <div className="text-2xl font-bold">
                                    {profile.name}
                                  </div>
                                  {sanitizedConfig.themeConfig.bannerSubtitle && (
                                    <div className="mt-1 text-sm text-base-content/60 whitespace-pre-line text-center">
                                      {sanitizedConfig.themeConfig.bannerSubtitle}
                                    </div>
                                  )}
                                </div>
                              </div>
                              {profile.bio && (
                                <div className="mt-1 text-sm opacity-80 text-center max-w-xl px-4">
                                  {profile.bio}
                                </div>
                              )}
                              {/* Info chips overlay */}
                              <div className="mt-4 flex flex-wrap justify-center gap-2 max-w-3xl px-4">
                                {/* 1) Location */}
                                {profile.location && (
                                  <a
                                    className="px-3 py-2 rounded-lg bg-base-100/80 backdrop-blur border border-base-300 text-sm shadow flex items-center gap-2"
                                    href={`https://www.google.com/maps/search/${encodeURIComponent(profile.location)}`}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <MdLocationOn />
                                    <span>{profile.location}</span>
                                  </a>
                                )}
                                {/* 2) School (first education) */}
                                {sanitizedConfig.educations?.length > 0 && sanitizedConfig.educations[0]?.institution && (
                                  <div className="px-3 py-2 rounded-lg bg-base-100/80 backdrop-blur border border-base-300 text-sm shadow flex items-center gap-2">
                                    <FaUniversity />
                                    <span className="truncate max-w-[14rem]">{sanitizedConfig.educations[0].institution}</span>
                                  </div>
                                )}
                                {/* 3) Email */}
                                {sanitizedConfig.social?.email && (
                                  <a
                                    className="px-3 py-2 rounded-lg bg-base-100/80 backdrop-blur border border-base-300 text-sm shadow flex items-center gap-2"
                                    href={`mailto:${sanitizedConfig.social.email}`}
                                  >
                                    <RiMailFill />
                                    <span className="truncate max-w-[14rem]">{sanitizedConfig.social.email}</span>
                                  </a>
                                )}
                                {/* 4) GitHub */}
                                {sanitizedConfig.github?.username && (
                                  <a
                                    className="px-3 py-2 rounded-lg bg-base-100/80 backdrop-blur border border-base-300 text-sm shadow flex items-center gap-2"
                                    href={`https://github.com/${sanitizedConfig.github.username}`}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <AiFillGithub />
                                    <span>@{sanitizedConfig.github.username}</span>
                                  </a>
                                )}
                                {/* 5) LinkedIn */}
                                {sanitizedConfig.social?.linkedin && (
                                  <a
                                    className="px-3 py-2 rounded-lg bg-base-100/80 backdrop-blur border border-base-300 text-sm shadow flex items-center gap-2"
                                    href={`https://www.linkedin.com/in/${sanitizedConfig.social.linkedin}`}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <FaLinkedin />
                                    <span>LinkedIn</span>
                                  </a>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : null
                  ) : (
                    <ThemeChanger
                      theme={theme}
                      setTheme={setTheme}
                      loading={loading}
                      themeConfig={sanitizedConfig.themeConfig}
                    />
                  )}
                  {/* Avatar card removed as banner now contains profile visuals */}
                  {!sanitizedConfig.themeConfig.disableSwitch && (
                    <DetailsCard
                      profile={profile}
                      loading={loading}
                      github={sanitizedConfig.github}
                      social={sanitizedConfig.social}
                    />
                  )}
                  {sanitizedConfig.skills.length !== 0 && (
                    <SkillCard
                      loading={loading}
                      skills={sanitizedConfig.skills}
                    />
                  )}
                  {sanitizedConfig.experiences.length !== 0 && (
                    <ExperienceCard
                      loading={loading}
                      experiences={sanitizedConfig.experiences}
                    />
                  )}
                  {sanitizedConfig.certifications.length !== 0 && (
                    <CertificationCard
                      loading={loading}
                      certifications={sanitizedConfig.certifications}
                    />
                  )}
                  {sanitizedConfig.educations.length !== 0 && (
                    <EducationCard
                      loading={loading}
                      educations={sanitizedConfig.educations}
                    />
                  )}
                </div>
              </div>
              <div className="lg:col-span-2 col-span-1">
                <div className="grid grid-cols-1 gap-6">
                  {sanitizedConfig.projects.github.display && (
                    <GithubProjectCard
                      header={sanitizedConfig.projects.github.header}
                      limit={sanitizedConfig.projects.github.automatic.limit}
                      githubProjects={githubProjects}
                      loading={loading}
                      googleAnalyticsId={sanitizedConfig.googleAnalytics.id}
                    />
                  )}
                  {sanitizedConfig.publications.length !== 0 && (
                    <PublicationCard
                      loading={loading}
                      publications={sanitizedConfig.publications}
                    />
                  )}
                  {sanitizedConfig.projects.external.projects.length !== 0 && (
                    <ExternalProjectCard
                      loading={loading}
                      header={sanitizedConfig.projects.external.header}
                      externalProjects={
                        sanitizedConfig.projects.external.projects
                      }
                      googleAnalyticId={sanitizedConfig.googleAnalytics.id}
                    />
                  )}
                  {sanitizedConfig.blog.display && (
                    <BlogCard
                      loading={loading}
                      googleAnalyticsId={sanitizedConfig.googleAnalytics.id}
                      blog={sanitizedConfig.blog}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          {sanitizedConfig.footer && (
            <footer
              className={`p-4 footer ${BG_COLOR} text-base-content footer-center`}
            >
              <div className="card card-sm bg-base-100 shadow-sm">
                <Footer content={sanitizedConfig.footer} loading={loading} />
              </div>
            </footer>
          )}
        </>
      )}
    </div>
  );
};

export default GitProfile;
