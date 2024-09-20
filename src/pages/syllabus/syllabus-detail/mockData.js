const syllabuses = [
  {
    syllabusId: 1,
    syllabusCode: 'LIN',
    syllabusName: 'Linux',
    status: 'Active',
    version: 'v2.0',
    ModifiedBy: 'Johny Deep',
    ModifiedDate: '2022-07-23',
    trainingLevel: 'All levels',
    attendeeNumber: 20,
    technicalRequirement: `
      <p>
        Trainees&rsquo; PCs need to have following software installed &amp; run
        without any issues:
        <br />
        &bull; Microsoft SQL Server 2005 Express
        <br />
        &bull; Microsoft Visual Studio 2017
        <br />
        &bull; Microsoft Office 2007 (Visio, Word, PowerPoint)
      </p>
    `,
    courseObjective: `
      <p>
        This topic is to introduce about C# programming language knowledge;
        adapt trainees with skills, lessons and practices which is specifically
        used in the Fsoft projects.
        <br />
        In details, after completing the topic, trainees will:
        <br />
        - Understand basic concepts of high-level programming languages
        (keyword, statement, operator, control-of-flow)
        <br />
        - Understand and distinguish two concepts: class (Class) and object
        (Object)
        <br />
        - Understand and apply object-oriented programming knowledge to resolve
        simple problems (Inheritance, Encapsulation, Abstraction, Polymorphism)
        <br />
        - Working with some of the existing data structures in C# (List,
        ArrayList, HashTable, Dictionary)
        <br />
        - Know how to control program errors (use try ... catch..finally, throw,
        throws)
        <br />
        - Be able to working with concurrency and multi-thread in C#
        <br />
        - Be able to working with common classes in ADO.net: SqlConnection,
        SqlCommand, SqlParameter, SqlDataAdapter, SqlDataReader
        <br />
        - Be able to manipulate SQL data from Window Form Application via 4
        basic commands: Add, Update, Delete, Select
        <br />
        - Know how to design UI screen in Window Form Application
        <br />- Know how to use approciate controls for each field/data type:
        Textbox, Label, Combobox, Radio, DateTimePicker, NumericUpDown,
        RichTextBox
      </p>
    `,
    outputStandards: [
      {
        outputStandardCode: 'H4SD',
        outputStandardDescription: 'Có kỹ năng viết chương trình một cách tối ưu, dễ sửa đổi. Biết tuân thủ Coding Convention, không mắc lỗi cơ bản.',
      },
      {
        outputStandardCode: 'K6SD',
        outputStandardDescription: 'Có kỹ năng viết chương trình một cách tối ưu, dễ sửa đổi. Biết tuân thủ Coding Convention, không mắc lỗi cơ bản.',
      },
      {
        outputStandardCode: 'H6SD',
        outputStandardDescription: 'Có kỹ năng viết chương trình một cách tối ưu, dễ sửa đổi. Biết tuân thủ Coding Convention, không mắc lỗi cơ bản.',
      },
    ],
    slots: [
      {
        slotNumber: 1,
        slotTitle: 'MVC architecture in ASP.NET',
        slotTotalDuration: '6hrs',
        slotDetails: [
          {
            detailName: 'MVC architecture pattern overview',
            outputStandardCode: 'K65D',
            outputStandardDescription: 'Có kỹ năng viết chương trình một cách tối ưu, dễ sửa đổi. Biết tuân thủ Coding Convention, không mắc lỗi cơ bản.',
            duration: '10mins',
            learningStype: 'Offline',
            delivertyType: 'Concept/Lecture',
            trainingMaterials: [
              {
                name: '.NET introduction overview.pdf',
                url: 'https://longdogechallenge.com/',
                createdBy: 'Joseph',
                createdDate: '2012-03-12',
              },
              {
                name: '.NET Introduction pattern in lorem.pdf',
                url: 'https://puginarug.com/',
                createdBy: 'Joseph',
                createdDate: '2012-03-12',
              },
              {
                name: 'What is future.youtube',
                url: 'https://maze.toys/mazes/mini/daily/',
                createdBy: 'Warrior Tran',
                createdDate: '2022-08-12',
              },
              {
                name: '.NET history.ppt',
                url: 'https://weirdorconfusing.com/',
                createdBy: 'Warrior Tran',
                createdDate: '2022-08-12',
              },
            ],
          },
          {
            detailName: 'Declaration & Assigment',
            outputStandardCode: 'K65D',
            outputStandardDescription: 'Có kỹ năng viết chương trình một cách tối ưu, dễ sửa đổi. Biết tuân thủ Coding Convention, không mắc lỗi cơ bản.',
            duration: '30mins',
            learningStype: 'Online',
            delivertyType: 'Concept/Lecture',
            trainingMaterials: [
              {
                name: '.NET introduction overview.pdf',
                url: 'https://longdogechallenge.com/',
                createdBy: 'Joseph',
                createdDate: '2012-03-12',
              },
              {
                name: '.NET Introduction pattern in lorem.pdf',
                url: 'https://puginarug.com/',
                createdBy: 'Joseph',
                createdDate: '2012-03-12',
              },
              {
                name: 'What is future.youtube',
                url: 'https://maze.toys/mazes/mini/daily/',
                createdBy: 'Warrior Tran',
                createdDate: '2022-08-12',
              },
              {
                name: '.NET history.ppt',
                url: 'https://weirdorconfusing.com/',
                createdBy: 'Warrior Tran',
                createdDate: '2022-08-12',
              },
            ],
          },
          {
            detailName: 'Pratice time: Assignment/Mentoring',
            outputStandardCode: 'K65D',
            outputStandardDescription: 'Có kỹ năng viết chương trình một cách tối ưu, dễ sửa đổi. Biết tuân thủ Coding Convention, không mắc lỗi cơ bản.',
            duration: '120mins',
            learningStype: 'Offline',
            delivertyType: 'Guide/Review',
            trainingMaterials: [
              {
                name: '.NET introduction overview.pdf',
                url: 'https://longdogechallenge.com/',
                createdBy: 'Joseph',
                createdDate: '2012-03-12',
              },
              {
                name: '.NET Introduction pattern in lorem.pdf',
                url: 'https://puginarug.com/',
                createdBy: 'Joseph',
                createdDate: '2012-03-12',
              },
              {
                name: 'What is future.youtube',
                url: 'https://maze.toys/mazes/mini/daily/',
                createdBy: 'Warrior Tran',
                createdDate: '2022-08-12',
              },
              {
                name: '.NET history.ppt',
                url: 'https://weirdorconfusing.com/',
                createdBy: 'Warrior Tran',
                createdDate: '2022-08-12',
              },
            ],
          },
        ],
      },
      {
        slotNumber: 2,
        slotTitle: 'Operators',
        slotTotalDuration: '3.5hrs',
        slotDetails: [
          {
            detailName: 'Operators',
            outputStandardCode: 'H4SD',
            outputStandardDescription: 'Có kỹ năng viết chương trình một cách tối ưu, dễ sửa đổi. Biết tuân thủ Coding Convention, không mắc lỗi cơ bản.',
            duration: '30mins',
            learningStype: 'Online',
            delivertyType: 'Concept/Lecture',
            trainingMaterials: [
              {
                name: '.NET introduction overview.pdf',
                url: 'https://longdogechallenge.com/',
                createdBy: 'Joseph',
                createdDate: '2012-03-12',
              },
              {
                name: '.NET Introduction pattern in lorem.pdf',
                url: 'https://puginarug.com/',
                createdBy: 'Joseph',
                createdDate: '2012-03-12',
              },
              {
                name: 'What is future.youtube',
                url: 'https://maze.toys/mazes/mini/daily/',
                createdBy: 'Warrior Tran',
                createdDate: '2022-08-12',
              },
              {
                name: '.NET history.ppt',
                url: 'https://weirdorconfusing.com/',
                createdBy: 'Warrior Tran',
                createdDate: '2022-08-12',
              },
            ],
          },
          {
            detailName: 'Comparation',
            outputStandardCode: 'H4SD',
            outputStandardDescription: 'Có kỹ năng viết chương trình một cách tối ưu, dễ sửa đổi. Biết tuân thủ Coding Convention, không mắc lỗi cơ bản.',
            duration: '30mins',
            learningStype: 'Offline',
            delivertyType: 'Concept/Lecture',
            trainingMaterials: [
              {
                name: '.NET introduction overview.pdf',
                url: 'https://longdogechallenge.com/',
                createdBy: 'Joseph',
                createdDate: '2012-03-12',
              },
              {
                name: '.NET Introduction pattern in lorem.pdf',
                url: 'https://puginarug.com/',
                createdBy: 'Joseph',
                createdDate: '2012-03-12',
              },
              {
                name: 'What is future.youtube',
                url: 'https://maze.toys/mazes/mini/daily/',
                createdBy: 'Warrior Tran',
                createdDate: '2022-08-12',
              },
              {
                name: '.NET history.ppt',
                url: 'https://weirdorconfusing.com/',
                createdBy: 'Warrior Tran',
                createdDate: '2022-08-12',
              },
            ],
          },
          {
            detailName: 'Logical Operators',
            outputStandardCode: 'H4SD',
            outputStandardDescription: 'Có kỹ năng viết chương trình một cách tối ưu, dễ sửa đổi. Biết tuân thủ Coding Convention, không mắc lỗi cơ bản.',
            duration: '30mins',
            learningStype: 'Offline',
            delivertyType: 'Guide/Review',
            trainingMaterials: [
              {
                name: '.NET introduction overview.pdf',
                url: 'https://longdogechallenge.com/',
                createdBy: 'Joseph',
                createdDate: '2012-03-12',
              },
              {
                name: '.NET Introduction pattern in lorem.pdf',
                url: 'https://puginarug.com/',
                createdBy: 'Joseph',
                createdDate: '2012-03-12',
              },
              {
                name: 'What is future.youtube',
                url: 'https://maze.toys/mazes/mini/daily/',
                createdBy: 'Warrior Tran',
                createdDate: '2022-08-12',
              },
              {
                name: '.NET history.ppt',
                url: 'https://weirdorconfusing.com/',
                createdBy: 'Warrior Tran',
                createdDate: '2022-08-12',
              },
            ],
          },
          {
            detailName: 'Pratice time: Assignment/Mentoring',
            outputStandardCode: 'H4SD',
            outputStandardDescription: 'Có kỹ năng viết chương trình một cách tối ưu, dễ sửa đổi. Biết tuân thủ Coding Convention, không mắc lỗi cơ bản.',
            duration: '120mins',
            learningStype: 'Online',
            delivertyType: 'Asignemnt/Lab',
            trainingMaterials: [
              {
                name: '.NET introduction overview.pdf',
                url: 'https://longdogechallenge.com/',
                createdBy: 'Joseph',
                createdDate: '2012-03-12',
              },
              {
                name: '.NET Introduction pattern in lorem.pdf',
                url: 'https://puginarug.com/',
                createdBy: 'Joseph',
                createdDate: '2012-03-12',
              },
              {
                name: 'What is future.youtube',
                url: 'https://maze.toys/mazes/mini/daily/',
                createdBy: 'Warrior Tran',
                createdDate: '2022-08-12',
              },
              {
                name: '.NET history.ppt',
                url: 'https://weirdorconfusing.com/',
                createdBy: 'Warrior Tran',
                createdDate: '2022-08-12',
              },
            ],
          },
        ],
      },
      {
        slotNumber: 3,
        slotTitle: 'Flow control',
        slotTotalDuration: '6hrs',
        slotDetails: [
          {
            detailName: 'MVC architecture pattern overview',
            outputStandardCode: 'K65D',
            outputStandardDescription: 'Có kỹ năng viết chương trình một cách tối ưu, dễ sửa đổi. Biết tuân thủ Coding Convention, không mắc lỗi cơ bản.',
            duration: '10mins',
            learningStype: 'Offline',
            delivertyType: 'Concept/Lecture',
            trainingMaterials: [
              {
                name: '.NET introduction overview.pdf',
                url: 'https://longdogechallenge.com/',
                createdBy: 'Joseph',
                createdDate: '2012-03-12',
              },
              {
                name: '.NET Introduction pattern in lorem.pdf',
                url: 'https://puginarug.com/',
                createdBy: 'Joseph',
                createdDate: '2012-03-12',
              },
              {
                name: 'What is future.youtube',
                url: 'https://maze.toys/mazes/mini/daily/',
                createdBy: 'Warrior Tran',
                createdDate: '2022-08-12',
              },
              {
                name: '.NET history.ppt',
                url: 'https://weirdorconfusing.com/',
                createdBy: 'Warrior Tran',
                createdDate: '2022-08-12',
              },
            ],
          },
          {
            detailName: 'Declaration & Assigment',
            outputStandardCode: 'H4SD',
            outputStandardDescription: 'Có kỹ năng viết chương trình một cách tối ưu, dễ sửa đổi. Biết tuân thủ Coding Convention, không mắc lỗi cơ bản.',
            duration: '30mins',
            learningStype: 'Online',
            delivertyType: 'Concept/Lecture',
            trainingMaterials: [
              {
                name: '.NET introduction overview.pdf',
                url: 'https://longdogechallenge.com/',
                createdBy: 'Joseph',
                createdDate: '2012-03-12',
              },
              {
                name: '.NET Introduction pattern in lorem.pdf',
                url: 'https://puginarug.com/',
                createdBy: 'Joseph',
                createdDate: '2012-03-12',
              },
              {
                name: 'What is future.youtube',
                url: 'https://maze.toys/mazes/mini/daily/',
                createdBy: 'Warrior Tran',
                createdDate: '2022-08-12',
              },
              {
                name: '.NET history.ppt',
                url: 'https://weirdorconfusing.com/',
                createdBy: 'Warrior Tran',
                createdDate: '2022-08-12',
              },
            ],
          },
          {
            detailName: 'Pratice time: Assignment/Mentoring',
            outputStandardCode: 'H4SD',
            outputStandardDescription: 'Có kỹ năng viết chương trình một cách tối ưu, dễ sửa đổi. Biết tuân thủ Coding Convention, không mắc lỗi cơ bản.',
            duration: '120mins',
            learningStype: 'Offline',
            delivertyType: 'Guide/Review',
            trainingMaterials: [
              {
                name: '.NET introduction overview.pdf',
                url: 'https://longdogechallenge.com/',
                createdBy: 'Joseph',
                createdDate: '2012-03-12',
              },
              {
                name: '.NET Introduction pattern in lorem.pdf',
                url: 'https://puginarug.com/',
                createdBy: 'Joseph',
                createdDate: '2012-03-12',
              },
              {
                name: 'What is future.youtube',
                url: 'https://maze.toys/mazes/mini/daily/',
                createdBy: 'Warrior Tran',
                createdDate: '2022-08-12',
              },
              {
                name: '.NET history.ppt',
                url: 'https://weirdorconfusing.com/',
                createdBy: 'Warrior Tran',
                createdDate: '2022-08-12',
              },
            ],
          },
        ],
      },
      {
        slotNumber: 4,
        slotTitle: 'Basic OOP',
        slotTotalDuration: '3.5hrs',
        slotDetails: [
          {
            detailName: 'Operators',
            outputStandardCode: 'H4SD',
            outputStandardDescription: 'Có kỹ năng viết chương trình một cách tối ưu, dễ sửa đổi. Biết tuân thủ Coding Convention, không mắc lỗi cơ bản.',
            duration: '30mins',
            learningStype: 'Online',
            delivertyType: 'Concept/Lecture',
            trainingMaterials: [
              {
                name: '.NET introduction overview.pdf',
                url: 'https://longdogechallenge.com/',
                createdBy: 'Joseph',
                createdDate: '2012-03-12',
              },
              {
                name: '.NET Introduction pattern in lorem.pdf',
                url: 'https://puginarug.com/',
                createdBy: 'Joseph',
                createdDate: '2012-03-12',
              },
              {
                name: 'What is future.youtube',
                url: 'https://maze.toys/mazes/mini/daily/',
                createdBy: 'Warrior Tran',
                createdDate: '2022-08-12',
              },
              {
                name: '.NET history.ppt',
                url: 'https://weirdorconfusing.com/',
                createdBy: 'Warrior Tran',
                createdDate: '2022-08-12',
              },
            ],
          },
          {
            detailName: 'Comparation',
            outputStandardCode: 'H4SD',
            outputStandardDescription: 'Có kỹ năng viết chương trình một cách tối ưu, dễ sửa đổi. Biết tuân thủ Coding Convention, không mắc lỗi cơ bản.',
            duration: '30mins',
            learningStype: 'Offline',
            delivertyType: 'Concept/Lecture',
            trainingMaterials: [
              {
                name: '.NET introduction overview.pdf',
                url: 'https://longdogechallenge.com/',
                createdBy: 'Joseph',
                createdDate: '2012-03-12',
              },
              {
                name: '.NET Introduction pattern in lorem.pdf',
                url: 'https://puginarug.com/',
                createdBy: 'Joseph',
                createdDate: '2012-03-12',
              },
              {
                name: 'What is future.youtube',
                url: 'https://maze.toys/mazes/mini/daily/',
                createdBy: 'Warrior Tran',
                createdDate: '2022-08-12',
              },
              {
                name: '.NET history.ppt',
                url: 'https://weirdorconfusing.com/',
                createdBy: 'Warrior Tran',
                createdDate: '2022-08-12',
              },
            ],
          },
          {
            detailName: 'Logical Operators',
            outputStandardCode: 'H4SD',
            outputStandardDescription: 'Có kỹ năng viết chương trình một cách tối ưu, dễ sửa đổi. Biết tuân thủ Coding Convention, không mắc lỗi cơ bản.',
            duration: '30mins',
            learningStype: 'Offline',
            delivertyType: 'Guide/Review',
            trainingMaterials: [
              {
                name: '.NET introduction overview.pdf',
                url: 'https://longdogechallenge.com/',
                createdBy: 'Joseph',
                createdDate: '2012-03-12',
              },
              {
                name: '.NET Introduction pattern in lorem.pdf',
                url: 'https://puginarug.com/',
                createdBy: 'Joseph',
                createdDate: '2012-03-12',
              },
              {
                name: 'What is future.youtube',
                url: 'https://maze.toys/mazes/mini/daily/',
                createdBy: 'Warrior Tran',
                createdDate: '2022-08-12',
              },
              {
                name: '.NET history.ppt',
                url: 'https://weirdorconfusing.com/',
                createdBy: 'Warrior Tran',
                createdDate: '2022-08-12',
              },
            ],
          },
          {
            detailName: 'Pratice time: Assignment/Mentoring',
            outputStandardCode: 'H4SD',
            outputStandardDescription: 'Có kỹ năng viết chương trình một cách tối ưu, dễ sửa đổi. Biết tuân thủ Coding Convention, không mắc lỗi cơ bản.',
            duration: '120mins',
            learningStype: 'Online',
            delivertyType: 'Asignemnt/Lab',
            trainingMaterials: [
              {
                name: '.NET introduction overview.pdf',
                url: 'https://longdogechallenge.com/',
                createdBy: 'Joseph',
                createdDate: '2012-03-12',
              },
              {
                name: '.NET Introduction pattern in lorem.pdf',
                url: 'https://puginarug.com/',
                createdBy: 'Joseph',
                createdDate: '2012-03-12',
              },
              {
                name: 'What is future.youtube',
                url: 'https://maze.toys/mazes/mini/daily/',
                createdBy: 'Warrior Tran',
                createdDate: '2022-08-12',
              },
              {
                name: '.NET history.ppt',
                url: 'https://weirdorconfusing.com/',
                createdBy: 'Warrior Tran',
                createdDate: '2022-08-12',
              },
            ],
          },
        ],
      },
    ],
    timeAllocation: [
      {
        deliveryType: 'Assignment/Lab',
        percentage: 54,
      },
      {
        deliveryType: 'Concept/Lecture',
        percentage: 29,
      },
      {
        deliveryType: 'Guide/Review',
        percentage: 9,
      },
      {
        deliveryType: 'Test/Quiz',
        percentage: 1,
      },
      {
        deliveryType: 'Exam',
        percentage: 6,
      },
    ],
    assignmentScheme: {
      scheme: [
        {
          name: 'Quiz',
          percentage: 15,
        },
        {
          name: 'Assigment',
          percentage: 15,
        },
        {
          name: 'Final',
          percentage: 70,
        },
      ],
      passingCriteria: [
        {
          name: 'GPA',
          criteria: '70%',
          required: true,
        },
      ],
    },
    trainingDeliveryPrinciples: `
    <table border="0" cellpadding="1" cellspacing="1" style="width:100%">
	<tbody>
		<tr>
			<td><strong><img alt="" src="https://ckeditor.com/apps/ckfinder/userfiles/files/Vector.png" style="height:22px; width:18px" />&nbsp;Training</strong></td>
			<td>
			<ul>
				<li>Trainee who actively complete online learning according to MOOC links provided</li>
				<li>At the end of the day, students complete Daily Quiz for 30 minutes</li>
				<li>Trainer/Mentor supports answering questions, guiding exercises 1.5-2.0h/day</li>
				<li>Trainer conduct the workshops</li>
				<li>Trainees complete Assignments and Labs</li>
				<li>Trainees have 1 final test in 4 hours (1 hour theory + 3 hours of practice)</li>
			</ul>
			</td>
		</tr>
		<tr>
			<td><strong><img alt="" src="https://ckeditor.com/apps/ckfinder/userfiles/files/Vector.png" style="height:22px; width:18px" />&nbsp;Re-test</strong></td>
			<td>
			<ul>
				<li>Only allow each student to retake the test up to 2 times</li>
				<li>Re-exam the same structure as the Final Test</li>
			</ul>
			</td>
		</tr>
		<tr>
			<td><strong><img alt="" src="https://ckeditor.com/apps/ckfinder/userfiles/files/Vector.png" style="height:22px; width:18px" />&nbsp;Marking</strong></td>
			<td>
			<ul>
				<li>Mentor review students on 2 Assignments</li>
				<li>Mentor marks the 3 Quizzes and Final Exam Theory</li>
				<li>Trainer marks the Final Exam Practice</li>
				<li>If the trainees have to retake test, the score will be calculated:
				<ul>
					<li>The score &gt;=6, the score will be 6</li>
					<li>The scroe &lt;6, the score will be that score</li>
				</ul>
				</li>
			</ul>
			</td>
		</tr>
		<tr>
			<td><strong><img alt="" src="https://ckeditor.com/apps/ckfinder/userfiles/files/Vector.png" style="height:22px; width:18px" />&nbsp;Waiver Criteria</strong></td>
			<td>
			<ul>
				<li>Students pass the quick test</li>
				<li>Trainer Audit: rank B</li>
			</ul>
			</td>
		</tr>
		<tr>
			<td><strong><img alt="" src="https://ckeditor.com/apps/ckfinder/userfiles/files/Vector.png" style="height:22px; width:18px" />&nbsp;Others</strong></td>
			<td>Trainers can allow students to complete homework and submit the next day</td>
		</tr>
	</tbody>
</table>

<p>&nbsp;</p>
    `,
  },
];
