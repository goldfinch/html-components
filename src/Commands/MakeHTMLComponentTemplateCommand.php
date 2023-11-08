<?php

namespace Goldfinch\HTMLComponents\Commands;

use Goldfinch\Taz\Console\GeneratorCommand;
use Goldfinch\Taz\Services\InputOutput;
use Symfony\Component\Console\Command\Command;

#[AsCommand(name: 'make:html-component-template')]
class MakeHTMLComponentTemplateCommand extends GeneratorCommand
{
    protected static $defaultName = 'make:html-component-template';

    protected $description = 'Create new HTML Component template';

    protected $path = 'themes/main/templates/Components';

    protected $type = 'html-component-template';

    protected $stub = './stubs/component-template.stub';

    protected function execute($input, $output): int
    {
        parent::execute($input, $output);

        return Command::SUCCESS;
    }
}
