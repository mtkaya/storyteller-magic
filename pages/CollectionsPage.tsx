import React from 'react';
import { STORY_COLLECTIONS } from '../data/collections';
import { LIBRARY_STORIES } from '../data';
import { useLanguage } from '../context/LanguageContext';
import { Story, ScreenName } from '../types';
import { getIllustratedImageUrl, getStoryCoverUrl } from '../services/illustrationCovers';

interface CollectionsPageProps {
    onBack: () => void;
    onStorySelect: (story: Story) => void;
}

const CollectionsPage: React.FC<CollectionsPageProps> = ({ onBack, onStorySelect }) => {
    const { language } = useLanguage();
    const [selectedCollection, setSelectedCollection] = React.useState<string | null>(null);

    const getStoriesForCollection = (storyIds: string[]): Story[] => {
        return LIBRARY_STORIES.filter(story => storyIds.includes(story.id));
    };

    const activeCollection = selectedCollection
        ? STORY_COLLECTIONS.find(c => c.id === selectedCollection)
        : null;

    if (activeCollection) {
        const stories = getStoriesForCollection(activeCollection.storyIds);

        return (
            <div className="flex flex-col min-h-screen bg-bg-dark">
                {/* Header with Cover */}
                <div className="relative h-56">
                    <img
                        src={getIllustratedImageUrl({
                            title: language === 'tr' ? activeCollection.nameTr : activeCollection.name,
                            subtitle: language === 'tr' ? activeCollection.descriptionTr : activeCollection.description,
                            theme: activeCollection.theme,
                            src: activeCollection.coverImage,
                            icon: activeCollection.icon
                        })}
                        alt={activeCollection.name}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/60 to-transparent" />

                    <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                        <button
                            onClick={() => setSelectedCollection(null)}
                            className="size-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white"
                        >
                            <span className="material-symbols-outlined">arrow_back</span>
                        </button>
                        {activeCollection.isPremium && (
                            <div className="bg-gradient-to-r from-primary to-secondary px-3 py-1 rounded-full">
                                <span className="text-sm font-bold text-white">⭐ Premium</span>
                            </div>
                        )}
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-4xl">{activeCollection.icon}</span>
                            <h1 className="text-2xl font-bold text-white">
                                {language === 'tr' ? activeCollection.nameTr : activeCollection.name}
                            </h1>
                        </div>
                        <p className="text-white/70 text-sm">
                            {language === 'tr' ? activeCollection.descriptionTr : activeCollection.description}
                        </p>
                        <p className="text-white/50 text-xs mt-1">
                            {stories.length} {language === 'tr' ? 'hikaye' : 'stories'}
                        </p>
                    </div>
                </div>

                {/* Stories List */}
                <div className="flex-1 p-4 space-y-4">
                    {stories.map((story, index) => (
                        <button
                            key={story.id}
                            onClick={() => onStorySelect(story)}
                            className="w-full flex items-center gap-4 p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-left"
                        >
                            <div className="w-20 h-24 rounded-xl overflow-hidden flex-shrink-0">
                                <img src={getStoryCoverUrl(story)} alt={story.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-white font-bold truncate">{story.title}</p>
                                <p className="text-white/50 text-sm truncate">{story.subtitle}</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="text-white/40 text-xs">{story.duration}</span>
                                    {story.isInteractive && (
                                        <span className="bg-secondary/20 text-secondary text-[10px] px-2 py-0.5 rounded-full">🎮 Interactive</span>
                                    )}
                                </div>
                            </div>
                            <span className="text-white/30">{index + 1}</span>
                        </button>
                    ))}
                </div>

                {/* Play All Button */}
                <div className="p-4 bg-bg-dark border-t border-white/5">
                    <button
                        onClick={() => stories[0] && onStorySelect(stories[0])}
                        className="w-full py-4 rounded-xl bg-primary text-white font-bold flex items-center justify-center gap-2"
                    >
                        <span className="material-symbols-outlined">play_arrow</span>
                        {language === 'tr' ? 'Koleksiyonu Dinle' : 'Play Collection'}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-bg-dark pb-24">
            {/* Header */}
            <div className="sticky top-0 z-40 bg-bg-dark/95 backdrop-blur-md border-b border-white/5 pt-4 pb-2">
                <div className="flex items-center gap-3 px-4 mb-2">
                    <button
                        onClick={onBack}
                        className="size-10 flex items-center justify-center rounded-full hover:bg-white/5 text-white"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <h1 className="text-xl font-bold text-white">
                        {language === 'tr' ? 'Koleksiyonlar' : 'Collections'}
                    </h1>
                </div>
            </div>

            {/* Collections Grid */}
            <div className="p-4 space-y-4">
                {STORY_COLLECTIONS.map(collection => (
                    <button
                        key={collection.id}
                        onClick={() => setSelectedCollection(collection.id)}
                        className="w-full relative h-36 rounded-2xl overflow-hidden group"
                    >
                        <img
                            src={getIllustratedImageUrl({
                                title: language === 'tr' ? collection.nameTr : collection.name,
                                subtitle: language === 'tr' ? collection.descriptionTr : collection.description,
                                theme: collection.theme,
                                src: collection.coverImage,
                                icon: collection.icon
                            })}
                            alt={collection.name}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

                        {/* Premium Badge */}
                        {collection.isPremium && (
                            <div className="absolute top-3 right-3 bg-gradient-to-r from-primary to-secondary px-2 py-1 rounded-full">
                                <span className="text-[10px] font-bold text-white">⭐ Premium</span>
                            </div>
                        )}

                        <div className="absolute inset-0 p-4 flex flex-col justify-end">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-2xl">{collection.icon}</span>
                                <h3 className="text-lg font-bold text-white">
                                    {language === 'tr' ? collection.nameTr : collection.name}
                                </h3>
                            </div>
                            <p className="text-white/70 text-sm line-clamp-1">
                                {language === 'tr' ? collection.descriptionTr : collection.description}
                            </p>
                            <p className="text-white/50 text-xs mt-1">
                                {collection.storyIds.length} {language === 'tr' ? 'hikaye' : 'stories'}
                            </p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CollectionsPage;
