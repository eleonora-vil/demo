import SyllabusCard from '@/components/card/syllabus-card';
import ActionIcons from '@/components/icons/action-icons';
import DeliveryTypesIcons from '@/components/icons/delivery-types-icons';
import { default as DocumentManageIcon, default as DocumentManageIcons } from '@/components/icons/document-manage-icons';
import IndicatorIcons from '@/components/icons/indicator-icons';
import NavigationIcons from '@/components/icons/navigation-icons';
import NavigatorIcons from '@/components/icons/navigator-icons';
import OtherIcons from '@/components/icons/other-icons';
import Modal from '@/components/modal/modal';
import ProgressBar from '@/components/progress-bar';
import SearchBox from '@/components/search-box';
import CourseStatusButton from '@/components/status/course-status';
import SyllabusStatus from '@/components/status/syllabus-status';
import { SyllabusTabs } from '@/components/syllabus-tab';
import TitleBanner from '@/components/title-banner';
import { useState } from 'react';

export default function Test() {
  const [isOpen, setIsOpen] = useState(false);
  const mockTags = ['HS4D'];



  return (
    <div>
      <TitleBanner title="Home Page" />
      <SyllabusStatus status="Inactive" />
      <SyllabusStatus status="Active" />
      <SyllabusStatus status="Draft" />
      <CourseStatusButton status={'offline'} />
      <div className="w-6/12">
        <ProgressBar step={1} />
        <ProgressBar step={2} />
        <ProgressBar step={3} />
        <ProgressBar step={4} />
      </div>

      <SyllabusTabs
        tabs={[
          {
            label: 'General',
            content: <h1>balaaa</h1>,
          },
          {
            label: 'Outline',
            content: <h1>abasbsaggs</h1>,
          },
          {
            label: 'Training Material',
            content: <h1>aaaaa</h1>,
          },
          {
            label: 'anhphi',
            content: <h1>aaaaa</h1>,
          },
        ]}
      />
      <SearchBox icon={<DocumentManageIcon icon="search" />} />
      <SearchBox icon={<DocumentManageIcon icon="search" />} iconRight={<DocumentManageIcon icon="search" />} />
      <SearchBox />
      <SearchBox icon={<DocumentManageIcon icon="search" />} chips={mockTags} />
      <SearchBox error="This field is required" />
      <SearchBox large />
      <SearchBox large visibleIcon={true} />
      {/* ICON DEMO */}
      <div className="flex justify-center gap-3 flex-wrap">
        <ActionIcons icon="add" className="bg-yellow-600 text-white" />
        <ActionIcons icon="arrow-dropdown-circle" className="bg-yellow-600 text-white" />
        <ActionIcons icon="cancel" className="bg-yellow-600 text-white" />
        <ActionIcons icon="drag-indicator" className="bg-yellow-600 text-white" />
        <ActionIcons icon="filter-list" className="bg-yellow-600 text-white" />
        <ActionIcons icon="more-horizontal" className="bg-yellow-600 text-white" />
        <ActionIcons icon="person-add" className="bg-yellow-600 text-white" />
        <ActionIcons icon="remove-circle-outline" className="bg-yellow-600 text-white" />
        <ActionIcons icon="sort" className="bg-yellow-600 text-white" />
        <ActionIcons icon="toggle-off" className="bg-yellow-600 text-white" />
        <ActionIcons icon="visibility" className="bg-yellow-600 text-white" />
        <ActionIcons icon="visibility-off" className="bg-yellow-600 text-white" />
        <DeliveryTypesIcons icon="exam" className="bg-blue-500 text-white" />
        <DeliveryTypesIcons icon="lab" className="bg-blue-500 text-white" />
        <DeliveryTypesIcons icon="lecture" className="bg-blue-500 text-white" />
        <DeliveryTypesIcons icon="quiz" className="bg-blue-500 text-white" />
        <DeliveryTypesIcons icon="review" className="bg-blue-500 text-white" />
        <DeliveryTypesIcons icon="workshop" className="bg-blue-500 text-white" />
        <DocumentManageIcons icon="copy" className="bg-lime-600 text-white" />
        <DocumentManageIcons icon="create" className="bg-lime-600 text-white" />
        <DocumentManageIcons icon="delete-forever" className="bg-lime-600 text-white" />
        <DocumentManageIcons icon="download" className="bg-lime-600 text-white" />
        <DocumentManageIcons icon="publish" className="bg-lime-600 text-white" />
        <DocumentManageIcons icon="search" className="bg-lime-600 text-white" />
        <DocumentManageIcons icon="upload" className="bg-lime-600 text-white" />
        <IndicatorIcons icon="checkbox" className="bg-red-600 text-white" />
        <IndicatorIcons icon="checkbox-outline-blank" className="bg-red-600 text-white" />
        <IndicatorIcons icon="filter-center-focus" className="bg-red-600 text-white" />
        <IndicatorIcons icon="grade" className="bg-red-600 text-white" />
        <IndicatorIcons icon="info" className="bg-red-600 text-white" />
        <IndicatorIcons icon="radio-button-checked" className="bg-red-600 text-white" />
        <IndicatorIcons icon="radio-button-unchecked" className="bg-red-600 text-white" />
        <IndicatorIcons icon="report-problem" className="bg-red-600 text-white" />
        <IndicatorIcons icon="supplier" className="bg-red-600 text-white" />
        <IndicatorIcons icon="verified-user" className="bg-red-600 text-white" />
        <IndicatorIcons icon="warning-logo" className="bg-red-600 text-white" />
        <NavigationIcons icon="biotech" className="bg-purple-600 text-white" />
        <NavigationIcons icon="book-open" className="bg-purple-600 text-white" />
        <NavigationIcons icon="calendar-today" className="bg-purple-600 text-white" />
        <NavigationIcons icon="close-chip" className="bg-purple-600 text-white" />
        <NavigationIcons icon="folder" className="bg-purple-600 text-white" />
        <NavigationIcons icon="group" className="bg-purple-600 text-white" />
        <NavigationIcons icon="home" className="bg-purple-600 text-white" />
        <NavigationIcons icon="menu-close" className="bg-purple-600 text-white" />
        <NavigationIcons icon="menu-open" className="bg-purple-600 text-white" />
        <NavigationIcons icon="nav-collapse" className="bg-purple-600 text-white" />
        <NavigationIcons icon="nav-default" className="bg-purple-600 text-white" />
        <NavigationIcons icon="school" className="bg-purple-600 text-white" />
        <NavigationIcons icon="settings" className="bg-purple-600 text-white" />
        <NavigatorIcons icon="arrow-back" className="bg-slate-600 text-white" />
        <NavigatorIcons icon="arrow-forward" className="bg-slate-600 text-white" />
        <NavigatorIcons icon="east" className="bg-slate-600 text-white" />
        <NavigatorIcons icon="first-page" className="bg-slate-600 text-white" />
        <NavigatorIcons icon="last-page" className="bg-slate-600 text-white" />
        <OtherIcons icon="account-box" className="bg-fuchsia-600 text-white" />
        <OtherIcons icon="alarm" className="bg-fuchsia-600 text-white" />
        <OtherIcons icon="call" className="bg-fuchsia-600 text-white" />
        <OtherIcons icon="chrome-reader-mode" className="bg-fuchsia-600 text-white" />
        <OtherIcons icon="domain" className="bg-fuchsia-600 text-white" />
        <OtherIcons icon="female" className="bg-fuchsia-600 text-white" />
        <OtherIcons icon="help-outline" className="bg-fuchsia-600 text-white" />
        <OtherIcons icon="home-work" className="bg-fuchsia-600 text-white" />
        <OtherIcons icon="local-library" className="bg-fuchsia-600 text-white" />
        <OtherIcons icon="mail" className="bg-fuchsia-600 text-white" />
        <OtherIcons icon="male" className="bg-fuchsia-600 text-white" />
        <OtherIcons icon="ondemand-video" className="bg-fuchsia-600 text-white" />
        <OtherIcons icon="role" className="bg-fuchsia-600 text-white" />
      </div>
      <button type="button" onClick={() => setIsOpen(true)}>
        open modal
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <div>
        <SyllabusCard />
      </div>
    </div>
  );
}
